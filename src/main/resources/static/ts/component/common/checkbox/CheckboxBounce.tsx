import React, { useCallback } from "react";

interface Define {checked:boolean;}
type ClickAndTouchEvent = React.MouseEvent|React.TouchEvent;
const CheckboxBounce = ({ checked }:Define) => {

	const onChange = useCallback(() => {}, []);
	const onClick = useCallback((evt:ClickAndTouchEvent) => {
		evt.stopPropagation();
	}, []);

	return (
	<div className={`checkbox bounce`}>
		<input type={`checkbox`} id={`bounce`} checked={checked} onClick={onClick} onChange={onChange} />
		<label htmlFor={`bounce`}>
			<span>
				<svg width={10} height={8}>
					<use xlinkHref={`#check-bounce`} />
				</svg>
			</span>
		</label>
		<svg className={`check`}>
			<symbol id={`check-bounce`} viewBox={`0 0 12 10`}>
				<polyline points={`1.5 6 4.5 9 10.5 1`} />
			</symbol>
		</svg>
	</div>
	);

};

export default React.memo(CheckboxBounce);