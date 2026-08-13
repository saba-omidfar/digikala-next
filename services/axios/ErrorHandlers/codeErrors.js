export async function sendCodeError(err) {
  if (err.response) {
    const message = err.response.data?.message || "خطایی رخ داده است";
    const status = err.response.status;
    return { success: false, message, status };
  }
  return { success: false, message: "سرور در دسترس نیست." };
}

export async function verifyCodeError(err) {
  //codes
}
