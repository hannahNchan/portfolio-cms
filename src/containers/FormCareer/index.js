import React from 'react'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import CareerPath from './careerPath';
import MenuSidebar from '../../components/MenuSidebar';
import CareeerItemsPath from './careerItemsPath';

const useStyles = makeStyles((theme) => ({
  paper: {
    height: '80%',
    width: '80%',
    backgroundColor: 'white',
  },
}));

const menuItems = [{name: 'Career'}, {name:'Social Networks'}];
const contentItems = [
  {name:'Career path', component: <CareeerItemsPath />},
  {name:'Redes sociales', component: <h2>Redes Sociales</h2>}
];

const FormCareer = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <MenuSidebar lateralMenu={menuItems} contentMenu={contentItems} />
    </Paper>
  )
}

export default FormCareer
