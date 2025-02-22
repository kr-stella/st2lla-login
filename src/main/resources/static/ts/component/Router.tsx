const NODE_MODE = process.env.NODE_ENV;

import React, { Fragment, lazy/* , Suspense */ } from "react";
import { Route, Routes } from "react-router-dom";

const Login = lazy(() => import("../component/view/Login"));
const DarkMode = lazy(() => import("../component/common/DarkMode"));

const Router = () => {
	return (
	<Fragment>
		<main className={`wrap`}>
			<section className={`box`}>
				<div className={`container`}>
				{/* <Suspense fallback={`Loading....`}> */}
					<Routes>
						<Route path={`/`} element={<Login />} />
					</Routes>
				{/* </Suspense> */}
				</div>
			</section>
		</main>
		{NODE_MODE && <DarkMode mode={NODE_MODE} />}
	</Fragment>
	);
}

export default Router;