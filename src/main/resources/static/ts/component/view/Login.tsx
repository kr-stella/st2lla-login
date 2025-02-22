import axios from "axios";
import classNames from "classnames";
import React, { lazy, useCallback, useRef, useState } from "react";

import { progressError, progressWarning } from "../common/alert";

const Lock = lazy(() => import("../common/icon").then(module => ({ default: module.Lock })));
const InputString = lazy(() => import("../common/input").then(module => ({ default: module.InputString })));
const InputPassword = lazy(() => import("../common/input").then(module => ({ default: module.InputPassword })));
const CheckboxStroke = lazy(() => import("../common/checkbox").then(module => ({ default: module.CheckboxStroke })));
const CheckboxBounce = lazy(() => import("../common/checkbox").then(module => ({ default: module.CheckboxBounce })));

const Login = () => {

	/** Caps Lock Ref */
	const ref = useRef<HTMLParagraphElement>(null);
	const timeout = useRef<number|null>(null);

	const [ noti, setNoti ] = useState<boolean>(true);
	// const [ username, setUsername ] = useState<string>(`st2lla-test`);
	// const [ password, setPassword ] = useState<string>(`test!Q3w`);
	const [ param, setParam ] = useState({ username: `st2lla-test`, password: `test!Q3w` });
	const [ rememberMe, setRememberMe ] = useState<boolean>(false);

	/** ID, Password 변경 */
	const onChange = useCallback(({ k, v }) => {
		setParam(prev => ({ ...prev, [k]: v }));
	}, []);

	/** Remember Me 변경 */
	const onRememberMe = useCallback(() => {
		setRememberMe(!rememberMe);
	}, [rememberMe]);

	/** CapsLock 여부 */
	const onCapsLock = useCallback((isActive:boolean) => {
		if(ref.current) {

			clearTimeout(timeout.current ?? undefined);
			ref.current.style.display = isActive? `block`:`none`;
			if(isActive) {
				timeout.current = window.setTimeout(() => {
					if(ref.current)
						ref.current.style.display = `none`;
				}, 2500);
			}

		}
	}, []);

	/** JTI 생성 ( JWT Token ID - 기기의 고유 식별번호 생성을 위함. ) */
	const createJTI = useCallback(() => {
		return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function(c) {
			let a = Math.random() * 16 | 0, v = c === `x` ? a : (a & 0x3 | 0x8);
			return v.toString(16);
		});
	}, []);
	
	/** 로그인 Action */
	const onLogin = useCallback((e:React.FormEvent<HTMLFormElement>) => {

		/** 새로고침 방지 */
		e.preventDefault();
		e.stopPropagation();

		const { username, password } = param;

		/** 데이터 */
		if(!username)
			{ progressWarning(`ID를 입력해주세요.`); return; }
		if(!password)
			{ progressWarning(`비밀번호를 입력해주세요.`); return; }
		/** 기기의 고유 식별번호 */
		if(!localStorage.getItem(`device`))
			localStorage.setItem(`device`, createJTI());

		const data = new FormData();
		data.append(`username`, username);
		data.append(`password`, password);
		data.append(`device`, localStorage.getItem(`device`) || ``);
		data.append(`rememberMe`, rememberMe.toString()); // Remember Me 상태 추가
		axios(`/loginproc`, {
			method: `POST`, data,
			headers: {
				"Content-Type": `application/x-www-form-urlencoded`
			}
		}).then((res) => {

			const { redirect } = res.data;
			if(res.status === 200)
				window.location.href = redirect;

		}).catch((err) => {

			console.error(err);
			if(!err.response.data.str) progressError(err.response.data.str)
			else progressError(`서버 및 데이터베이스 이슈발생 <br /> 관리자에게 연락부탁드립니다.`);

		});

	}, [ param, rememberMe ]);

	return (
	<div className={`login-wrap shadow-3d`}>
		<div className={`login-box`}>

			<div className={`welcome`}>
				<p>{`Welcome,`}</p>
				<p>{`Sign in to Continue !`}</p>
			</div>
			{noti && <article className={classNames(`notification`, `notification-light-primary`)}>
				<div className={`noti-icon`}>
					<Lock />
				</div>
				<div className={`noti-text`}>
					<div>
						<strong>{`ID: `}</strong>
						<span>{`st2lla-test`}</span>
					</div>
					<div>
						<strong>{`Password: `}</strong>
						<span>{`test!Q3w`}</span>
					</div>
				</div>
				<button type={`button`} className={`button-close`}
					onClick={() => setNoti(false)} />
			</article>}
			<form className={`login`} onSubmit={onLogin}>
				<div className={`input-box`}>
					<InputString holder={`ID`} focus={true}
						// data={username}
						// onChange={(v:string) => setUsername(v)}
						data={param.username}
						onChange={(v:string) => onChange({ k: `username`, v })}
					/>
				</div>
				<div className={`input-box`}>
					<InputPassword holder={`Password`}
						// data={password}
						// onChange={(v:string) => setPassword(v)}
						data={param.password}
						onChange={(v:string) => onChange({ k: `password`, v })}
						onCapsLock={onCapsLock}
					/>
				</div>
				<p ref={ref} className={`capslock`}><strong>{`< Caps Lock >`}</strong>{` 이 켜져 있습니다.`}</p>
				<div className={`checkbox-wrap mb-2`}>

					<div className={`checkbox-container`}>
						<div className={`checkbox-section pointer`} onClick={onRememberMe}>
							<CheckboxStroke checked={rememberMe} />
							<p>{`Remember Me`}</p>
						</div>
					</div>
					<div className={`checkbox-container`}>
						<div className={`checkbox-section pointer`} onClick={onRememberMe}>
							<CheckboxBounce checked={rememberMe} />
							<p>{`Remember Me`}</p>
						</div>
					</div>

				</div>
				{rememberMe && <p className={`rememberMe`}>{`자동로그인은 1년간 유지됩니다.`}</p>}
				<button type={`submit`} className={`button-control button-control-warning`}>{`Login`}</button>
			</form>

		</div>
	</div>
	);

};

export default React.memo(Login);