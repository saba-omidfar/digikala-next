const mongoose = require("mongoose");

const LOCAL_URI = "mongodb://127.0.0.1:27017/digikala";

const REMOTE_URI =
  "mongodb://root:r8WIUgRJMv0Xn96-pbln-Pv7@mongo-01a0434c-8633-774e-bf0f-e39ec2a80c2a.db.abrclick.cloud:20006/digikala?authSource=admin";

async function migrate() {
  let local;
  let remote;

  try {
    console.log("🔵 Connecting to LOCAL MongoDB...");

    local = await mongoose.createConnection(LOCAL_URI).asPromise();

    console.log("✅ LOCAL connected");

    console.log("🟢 Connecting to REMOTE MongoDB...");

    remote = await mongoose.createConnection(REMOTE_URI).asPromise();

    console.log("✅ REMOTE connected");

    const collections = await local.db.listCollections().toArray();

    console.log(`\n📦 Found ${collections.length} collections\n`);

    for (const { name } of collections) {
      const source = local.db.collection(name);
      const target = remote.db.collection(name);

      const documents = await source.find({}).toArray();

      console.log(`➡️ ${name}: ${documents.length} documents`);

      if (!documents.length) {
        continue;
      }

      // اگر قبلاً چیزی در مقصد باشد، پاک می‌کنیم
      await target.deleteMany({});

      // همان documentها و همان _id ها وارد می‌شوند
      await target.insertMany(documents);

      const count = await target.countDocuments();

      console.log(`   ✅ Remote: ${count} documents`);
    }

    console.log("\n🎉 MIGRATION COMPLETED!");
  } catch (error) {
    console.error("\n❌ MIGRATION FAILED:");
    console.error(error);
  } finally {
    if (local) await local.close();
    if (remote) await remote.close();

    process.exit();
  }
}

migrate();
