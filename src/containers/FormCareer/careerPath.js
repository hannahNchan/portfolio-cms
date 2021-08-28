import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import '../App.css';
import CardForm from '../../components/CardForm';

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
}));

const CareerPath = ({ isModal = false, dataPath }) => {
  const [textItem, setTextItem] = useState([]);
  const [items, setItems] = useState([]);
  const classes = useStyles();
  const [path, setPath] = useState([]);

  useEffect(() => {
    setPath(dataPath);
  },[dataPath]);

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

  return (
    <>
      <Grid className={classes.pt3} container spacing={6}>
        {path.map((item, index) => {
          const { date, content } = item;
          const { title, subtitle, description, activities, technologies } = content;
          return (
            <Grid className={classes.boxShadow1} item md={isModal ? 12 : 6} xs={12}>
              <CardForm
                date={date}
                title={title}
                index={index}
                classes={classes}
                subtitle={subtitle}
                textItem={textItem}
                activities={activities}
                description={description}
                handleAddItem={handleAddItem}
                onHandleDeleteItem={onHandleDeleteItem}
                onHandleChangeText={onHandleChangeText}
              />
            </Grid>
          )
        })}
      </Grid >
    </>
  )
}

export default CareerPath;
