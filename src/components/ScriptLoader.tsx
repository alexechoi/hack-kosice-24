// UNUSED - subbed for pages/GamesPage/SnakeGameCanvas.tsx

import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

// interface ScriptLoaderProps {
//   src: string;
// }
{/* <ScriptLoaderProps>*/}

function ScriptLoader (): JSX.Element {
	const [levelNumber, setLevelNumber] = useState<number | null>(null);
	const { currentUser } = useContext(AuthContext);

  	useEffect(() => {
		const fetchLevelNumber = async () => {
			if (currentUser) {
				try {
					const userRef = collection(db, 'users');
					const q = query(userRef, where('uid', '==', currentUser.uid));
					const querySnapshot = await getDocs(q);

					console.log('Portfolio snapshot empty?:', querySnapshot.empty);
					if (!querySnapshot.empty) {
					const userData = querySnapshot.docs[0].data();
					console.log("userData" + userData);
					console.log("userData" + userData.levelNumber);
					setLevelNumber(userData.levelNumber);
					}
				} catch (error) {
					console.error('Error fetching level number:', error);
				}
			};
		};

		fetchLevelNumber();
	}, []);

	const script = document.createElement('script');
	console.log("levelNumber:" + levelNumber);
	switch (levelNumber) {
		case 1:
			script.src = "src/scripts/game-stages/snake-beginner.js";
			break;
		case 2:
			script.src = "src/scripts/game-stages/snake-experienced.js";
			break;
		case 3:
			script.src = "src/scripts/game-stages/snake-pro.js";
			break;
		default:
			console.error("Error while fetching the user's level difficulty");
	}
	script.async = true;
		
	return <script src={script.src}></script>;
};

export default ScriptLoader;
