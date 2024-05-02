import React from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import { strings } from './src/localization/localization';

const App = () => {

  strings.setLanguage('ru');

  return (
    <RootNavigation />
  );
};

export default App;