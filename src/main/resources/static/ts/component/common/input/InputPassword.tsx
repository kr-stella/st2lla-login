import React, { Fragment, useCallback } from "react";

interface Define {data:string; holder:string; onChange:(v:string) => void; onCapsLock:(v:boolean) => void;};
const InputPassword = ({ data, holder, onChange, onCapsLock }:Define) => {

	/** Input Change */
	const onData = useCallback((e:React.ChangeEvent<HTMLInputElement>):void => {
		onChange(e.target.value);
	}, []);

	/** key down */
	const onKeyDown = useCallback((e:React.KeyboardEvent<HTMLInputElement>):void => {

		const key = e.key;
		const capslock = e.getModifierState(`CapsLock`);

		/** CapsLock 상태 + 알파벳 키를 누를 때 */
		if(capslock && ((key >= `A` && key <= `Z`) || (key >= `a` && key <= `z`)))
			onCapsLock(true);
		else onCapsLock(false);

	}, []);

	return (
	<Fragment>
		<input type={`password`} className={`input-control none-placeholder shadow-inset`}
			value={data} placeholder={holder}
			onChange={onData} onKeyDown={onKeyDown} spellCheck={false} />
		<label>{holder}</label>
	</Fragment>
	);

};

export default React.memo(InputPassword, (prev, next) => {
	return prev.data === next.data;
});