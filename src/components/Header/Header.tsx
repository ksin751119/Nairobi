import React from 'react';
import './Header.css';


import {ReactElement} from "react";
import { WalletStatus } from '../../components/WalletStatus';
import { ActivateDeactivate } from '../../components/ActivateDeactivate';
import { ActivateDeactivate2 } from '../../components/ActivateDeactivate2';
// import { Table } from '@welcome-ui/table'


export function Header():ReactElement {



	return (
		<header className="header header--section">
			{/* <div className="inner clearfix"> */}

				<div className="header-logo">
					{/* <span>&lt;</span> */}
					Nairobi
					{/* <a href="#">{greeting.username}</a> */}
					{/* <span>/&gt;</span> */}

				</div>
				<div>
				<ul className="nav-menu">
				<WalletStatus/>

				<ActivateDeactivate2 />
				</ul>

				</div>



			{/* </div> */}
		</header>
	);
}
// export default Header;
