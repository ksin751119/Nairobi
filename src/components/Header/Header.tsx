import React from 'react';
import './Header.css';


import {ReactElement} from "react";
import { WalletStatus } from '../../components/WalletStatus';
import { ActivateDeactivate } from '../ActivateDeactivate';
// import { Table } from '@welcome-ui/table'


export function Header():ReactElement {



	return (
		<header className="header header--section">
				<div className="header-logo">
					<a href="https://github.com/ksin751119/Nairobi" style={{color:'black'}} target="_blank" rel="noreferrer" ><img src={require('../../assets/images/logoN.png')} alt="Background" height="40"/></a>
				</div>
				<div>
				<ul className="nav-menu">
				<WalletStatus/>
				<ActivateDeactivate />
				</ul>

				</div>



			{/* </div> */}
		</header>
	);
}
// export default Header;
