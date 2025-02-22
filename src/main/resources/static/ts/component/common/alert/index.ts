import Swal from "sweetalert2";

export const error = (html:string) => Swal.fire({ html, icon: `error` });
export const progressError = (html:string) => Swal.fire({ html, icon: `error`, timer: 2500, timerProgressBar: true });

export const success = () => Swal.fire({ title: `Success !`, icon: `success` });
export const progressSuccess = () => Swal.fire({ title: `Success !`, icon: `success`, timer: 1500, timerProgressBar: true });


export const warning = (html:string) => Swal.fire({ html, icon: `warning` });
export const progressWarning = (html:string) => Swal.fire({ html, icon: `warning`, timer: 2500, timerProgressBar: true });

/** Swal 확인 여부창 */
export const confirmWarning = (html:string) => {
	/** return한 이유는 호출 후 .then으로 후처리하기 위함. */
	return Swal.fire({
		html, icon: `warning`,
		showCancelButton: true,
		confirmButtonText: `OK`, cancelButtonText: `Cancel`,
		confirmButtonColor: `#2189ff`, cancelButtonColor: `#000000`
	});
};