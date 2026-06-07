import React from 'react';
import ReactDOM from 'react-dom/client';

import TeamFinder from './components/TeamFinder.jsx';
import { Analytics } from '@vercel/analytics/react';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
	
		<TeamFinder />
	<Analytics />
	</React.StrictMode>
);
