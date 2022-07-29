import React from 'react';
import './Hello.css';
import {ReactElement} from "react";
// import { greeting } from '../../portfolio';
// import Social from '../Social/Social';

export function Hello():ReactElement {
	const Fade: any = require("react-reveal/Fade");
	return (
		<Fade bottom duration={800}>
		<section className="section--hello">
			<div className="inner">

				<div className="wrapper">
					<div className="text-title">
						Welcome to NAIROBI&nbsp;
						<span className="hello-emoji">👋</span>
					</div>
					{/* <div className="role">
						<span>Role</span>
					</div> */}
					<div className="text-subtitle">
						<span>Deployment tools for smart contract developer</span>
					</div>
					<div className="social-links">
						{/* <Social /> */}
					</div>

				</div>

			</div>
		</section>
		</Fade>
	);
}
// export default Hello;
