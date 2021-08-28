import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ width: '90%' }}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  rightPanel: {
    backgroundColor: '#e9edf3',
  },
}));

const componentSelected = (contentMenu, value) => {
  return contentMenu[value].component;
}

const MenuSidebar = ({ lateralMenu, contentMenu }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {lateralMenu.map((item, index) => {
          return <Tab key={item.name} label={item.name} {...a11yProps(index)} />;
        })}
      </Tabs>
      {contentMenu.map((item, index) => {
        return (
          <TabPanel key={`key-${index}`} value={value} index={index}>
            <Typography variant="h4" gutterBottom> 
              {item.name}
            </Typography>
            {componentSelected(contentMenu, value)}
          </TabPanel>
        )
      })}
    </div>
  );
}

export default MenuSidebar;
