import './GamesPage.css';
import ScriptLoader from '../../components/ScriptLoader';

function GamesPage (): JSX.Element {
	return (
		<div className="games-page">
			<script src={`${<ScriptLoader/>}`}/>
		</div>
	);

}

export default GamesPage;
