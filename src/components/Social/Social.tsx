
import {ReactElement} from "react";
import './Social.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub,faTwitter, faMedium, faMediumM } from '@fortawesome/free-brands-svg-icons'


export function Social() :ReactElement {
	return(<>
						<div>
						{<a href="https://github.com/ksin751119/Nairobi" >
						<FontAwesomeIcon icon={faGithub} color="#24292e" size="xs" style={{marginRight:20}} />
						</a>}
						{<a href="https://twitter.com/ksin751119">
  					<FontAwesomeIcon icon={faTwitter} color="#2aa9e0" size="xs"style={{marginRight:20}} />
						</a>}
						{<a href='https://medium.com/@ksin751119'>
						<FontAwesomeIcon icon={faMediumM} color="#000000" size="xs" style={{marginRight:20}} />
						</a>}
						</div>
			</>
	);


}
