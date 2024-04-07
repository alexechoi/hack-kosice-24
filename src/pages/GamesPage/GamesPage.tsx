import './GamesPage.css';
import ScriptLoader from '../../components/ScriptLoader.tsx';

function GamesPage (): JSX.Element {
	return (
		<div className="games-page">
			console.log({`a thing: ${<ScriptLoader/>}`});
			<script src={`${<ScriptLoader/>}`}/>
		</div>
	);

}

export default GamesPage;
