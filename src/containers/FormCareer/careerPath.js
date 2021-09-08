import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import '../App.css';
import { _POST, _DELETE } from '../../api';
import CardForm from '../../components/CardForm';
import SnackBar from '../../components/SnackBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  boxShadow: {
    boxShadow: '0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%)',
    padding: '1rem',
  },
  boxShadow1: {
    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset',
  },
  demo: {
    boxShadow: '0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%)',
    borderRadius: '2%',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  button: {
    alignSelf: 'flex-end',
  },
  pt3: {
    marginTop: '3px',
  },
  actionButtons: {
    marginTop: '2rem'
  }
}));

const CareerPath = ({ isModal = false, dataPath, fetchAPI }) => {
  const [textItem, setTextItem] = useState([]);
  const [items, setItems] = useState([]);
  const classes = useStyles();
  const [path, setPath] = useState([]);
  const [isDisabled, setIsDisabled] = useState([]);
  const [textTechnology, setTextTechnology] = useState([]);
  const [alert, setAlert] = useState({
    type: '', message: '', open: false
  });

  useEffect(() => {
    setPath(dataPath);
    const clonedDisabled = [...isDisabled];
    dataPath.map((_, index) => {
      clonedDisabled[index] = false;
    });
    setIsDisabled([...clonedDisabled]);
  },[dataPath]);

  const onHandleDeleteChips = (chipToDelete, index) => () => {
    const clonedArray = [...path];
    const chipsCloned = clonedArray[index].content.technologies; 
    const finalChips = chipsCloned.filter((_, idx) => idx !== chipToDelete.key);
    clonedArray[index].content.technologies = [...finalChips];
    setPath([...clonedArray]);
  };

  const onHandleChangeChips = (index, e) => {
    const clonedArray = [...textTechnology];
    clonedArray[index] = e.target.value;
    setTextTechnology([...clonedArray]);
  };

  const onAddItemChips = (index) => {
    const clonedText = [...textTechnology];
    clonedText[index] = '';
    setTextTechnology([...clonedText]);
    const clonedArray = [...path];
    const technologiesLength = clonedArray[index].content.technologies.length;
    clonedArray[index].content.technologies.push(textTechnology[index]);
    setPath([...clonedArray]);
  };

  const onHandleChangeText = ({ target }, index) => {
    if (target.name === 'activities') {
      const clonedArray = [...textItem];
      clonedArray[index] = target.value;
      setTextItem([...clonedArray])
    } else {
      const clonedArray = [...path];
      clonedArray[index].content[target.name] = target.value;
      setPath([...clonedArray]);
    }
  }

  const onHandleDateChange = (date, index) => {
    const convertToTimestamp = + new Date(date);
    const clonedArray = [...path];
    clonedArray[index].date = convertToTimestamp;
    setTextItem([...clonedArray])
  };

  const handleAddItem = (name, index) => {
    const clonedText = [...textItem];
    clonedText[index] = '';
    setTextItem([...clonedText])

    let clonedArray = [...path];
    clonedArray[index].content[name].push(textItem[index]);
    setItems([...clonedArray]);
  }

  const onHandleDeleteItem = (name, value, generalIndex) => {
    let clonedArray = [...path];
    const newArray = clonedArray[generalIndex].content[name].filter((_, idx)=> idx !== value)
    clonedArray[generalIndex].content[name] = [...newArray];
    setItems([...clonedArray]);
  }

  const handleDisableCheck = (e, index) => {
    const clonedDisabled = [...isDisabled];
    clonedDisabled[index] = e.target.checked;
    setIsDisabled([...clonedDisabled]);
  };

  const handleDeleteItem = async () => {
    const id = isDisabled.indexOf(true);
    const response = await _DELETE(id);
    if (response.status === 'ok') {
      setAlert({
        ...alert,
        open: true,
        type: 'success',
        message: response.payload.message
      })
      fetchAPI();
    }
  };

  const handleSaveChanges = async () => {
    const id = isDisabled.indexOf(true);
    const { date, content } = items[id];
    const payload = { date, ...content };
    const response = await _POST(payload, id);
    if (response.status === 'ok') {
      setAlert({
        ...alert,
        open: true,
        type: 'success',
        message: response.payload.message
      })
      fetchAPI();
    }
  };

  return (
    <>
      <Grid className={classes.pt3} container spacing={6}>
        {path.map((item, index) => {
          const { date, content } = item;
          const { title, subtitle, description, activities, technologies } = content;
          return (
            <Grid className={classes.boxShadow1} item md={isModal ? 12 : 6} xs={12}>
              {!isModal && (
                <FormControl component="fieldset">
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      value="start"
                      control={<Switch color="primary" />}
                      label="Edit this path"
                      labelPlacement="start"
                      onChange={(e) => handleDisableCheck(e, index)}
                    />
                  </FormGroup>
                </FormControl>
              )}
              <CardForm
                date={date}
                title={title}
                index={index}
                isModal={isModal}
                classes={classes}
                selectedDate={date}
                textItem={textItem}
                subtitle={subtitle}
                activities={activities}
                description={description}
                technologies={technologies}
                handleAddItem={handleAddItem}
                onAddItemChips={onAddItemChips}
                textTechnology={textTechnology}
                disabledForm={isDisabled[index]}
                handleDateChange={onHandleDateChange}
                onHandleDeleteItem={onHandleDeleteItem}
                onHandleChangeText={onHandleChangeText}
                onHandleDateChange={onHandleDateChange}
                onHandleDeleteChips={onHandleDeleteChips}
                onHandleChangeChips={onHandleChangeChips}
              />
              {!isModal && (
                <Grid
                  md={12}
                  container
                  spacing={5}
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                  className={classes.actionButtons}
                >
                  <Button
                    disabled={!isDisabled[index]}
                    variant="contained"
                    color="secondary"
                    disableElevation
                    onClick={handleDeleteItem}
                  >
                    Delete element
                  </Button>
                  <Button
                    style={{ marginLeft: '2rem' }}
                    disabled={!isDisabled[index]}
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </Button>
                </Grid>
              )}
            </Grid>
          )
        })}
        <SnackBar 
          open={alert.open}
          severity={alert.type}
          message={alert.message}
        />
      </Grid >
    </>
  )
}

export default CareerPath;
