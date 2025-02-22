import React, { Fragment, useCallback, useEffect, useRef } from "react";

type Define = {data:string; holder:string; focus?:boolean; onChange:(v:string) => void;}
	|{data:string; holder:string; focus:boolean; onChange:(v:string) => void;};
const InputString = ({ data, holder, focus, onChange }:Define) => {

	const ref = useRef<HTMLInputElement>(null);

	/** Input Change */
	const onData = useCallback((e:React.ChangeEvent<HTMLInputElement>):void => {
		onChange(e.target.value);
	}, []);

	/** Auto Focus */
	useEffect(() => {
		if(ref.current && focus)
			ref.current.focus();
	}, [focus]);

	return (
	<Fragment>
		<input ref={ref} type={`text`} className={`input-control none-placeholder shadow-inset`}
			value={data} placeholder={holder} onChange={onData} spellCheck={false} />
		<label>{holder}</label>
	</Fragment>
	);

};

export default React.memo(InputString, (prev, next) => {
	return prev.data === next.data;
});