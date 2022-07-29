
import {ReactElement} from "react";
import './Social.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub,faTwitter, faMedium,faMediumM } from '@fortawesome/free-brands-svg-icons'

export const socialMediaLinks = {
	// IMPORTANT
	// if you don't have, change value to blank or false!! DO NOT DELETE!
	github: 'https://github.com/ksin751119/Nairobi',
	linkedin: 'Your linkedin link',
	email: 'ksin751119@gmail.com',
	facebook: 'Your facebook link',
	twitter: "https://twitter.com/ksin751119",
	instagram: "Your instagram link",
	medium: 'https://medium.com/@ksin751119',
	stackoverflow: 'Your stackoverflow link'
};

export function Social() :ReactElement {
	return(<></>
		// <div className="social-media-links">
		// 	<tbody>
		// 		<tr>
		// 			<td>
		// 				{<a href={socialMediaLinks.github} >
		// 				<FontAwesomeIcon icon={faGithub} color="#24292e" size="xs" style={{marginRight:20}} />
		// 				</a>}
		// 			</td>
		// 			<td>
		// 				{<a href={socialMediaLinks.twitter}>
  	// 				<FontAwesomeIcon icon={faTwitter} color="#2aa9e0" size="xs"style={{marginRight:20}} />
		// 				</a>}
		// 			</td>
		// 			<td>
		// 				{<a href={socialMediaLinks.medium}>
		// 				<FontAwesomeIcon icon={faMediumM} color="#000000" size="xs" style={{marginRight:20}} />
		// 				</a>}
		// 			</td>
		// 	</tr>
		// 	</tbody>
		// </div>
	);


}
