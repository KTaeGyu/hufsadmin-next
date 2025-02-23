import swal from "sweetalert2";

const TopEndToast = swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});

const TopToast = swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000,
});

const CenterToast = swal.mixin({
  toast: true,
  position: "center",
  showConfirmButton: false,
  timer: 3000,
});

const BottomEndToast = swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
});

export { BottomEndToast, CenterToast, TopEndToast, TopToast };
