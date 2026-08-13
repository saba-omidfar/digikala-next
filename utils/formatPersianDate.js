import moment from "jalali-moment";

export default function formatPersianDate(date) {
  return moment(date).locale("fa").format("jD jMMMM jYYYY");
}
