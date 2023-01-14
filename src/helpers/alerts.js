import Swal from "sweetalert2";

export function alert(type, message) {
  return Swal.fire({
    icon: type,
    title: message,
    showConfirmButton: true,
    allowEnterKey: false,
    allowEscapeKey: false,
    allowOutsideClick: false,
  }).then((res) => {
    window.location.reload();
  });
}

export function alertCustom(type, message, path) {
  return Swal.fire({
    icon: type,
    title: message,
    showConfirmButton: true,
    allowEnterKey: false,
    allowEscapeKey: false,
    allowOutsideClick: false,
  }).then((res) => {
    window.location.pathname = path;
  });
}

export function alertDefault(type, message) {
  return Swal.fire({
    icon: type,
    title: message,
    showConfirmButton: true,
    allowEnterKey: false,
    allowEscapeKey: false,
    allowOutsideClick: false,
  }).then((res) => {});
}
