import React from "react";
import { useState, useEffect } from 'react';
import { Avatar, Button, createTheme, Dialog, DialogActions, DialogContent, FormControlLabel, Input, MenuItem, Radio, RadioGroup, Select, Stack, TextField, ThemeProvider, Typography } from '@mui/material';
import styles from './DishDialog.module.css';
import { addReceipt, updateDish  } from "../../utilites/firebase/firestore";
import { getDownloadURL, replaceImage, uploadImage } from "../../utilites/firebase/storage";
import { DISHES_ENUM } from "./AdminTest";
import { useAuth } from "../../utilites/firebase/auth";
import { yellow } from "@mui/material/colors";

const DEFAULT_FILE_NAME = "Файл не обрано!";

// Default form state for the dialog
const DEFAULT_FORM_STATE = {
  available: null,
  dishName: "",
  description: "",
  category: "Оберіть категорію",
  fileName: DEFAULT_FILE_NAME,
  file: null,
  imageBucketURL: "",
  imageURL: "",
  price: undefined,
  portion: "",
  portionNominal: '',
};

/* 
 Dialog to input receipt information
 
 props:
  - edit is the receipt to edit
  - showDialog boolean for whether to show this dialog
  - onError emits to notify error occurred
  - onSuccess emits to notify successfully saving receipt
  - onCloseDialog emits to close dialog
 */
export default function DishDialog(props) {
  const isEdit = Object.keys(props.edit).length > 0;
  const { authUser } = useAuth();
  const [formFields, setFormFields] = useState(isEdit ? props.edit : DEFAULT_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If the receipt to edit or whether to close or open the dialog ever changes, reset the form fields
  useEffect(() => {
    if (props.showDialog) {
      setFormFields(isEdit ? props.edit : DEFAULT_FORM_STATE);
    }
  }, [props.edit, props.showDialog])

  // Check whether any of the form fields are unedited
  const isDisabled = () => formFields.dishName.length === 0 || formFields.fileName === DEFAULT_FILE_NAME 
                            || formFields.category === 'Оберіть категорію' || !formFields.price || formFields.price === '0'
                            || formFields.portion.length === 0 || formFields.portionNominal.length === 0
                            || formFields.portionNominal === '--' || formFields.description.length === 0 || !formFields.available;

  // Update given field in the form
  const updateFormField = (event, field) => {
    setFormFields(prevState => ({...prevState, [field]: event.target.value}))
  }

  // Set the relevant fields for receipt image
  const setFileData = (target) => {
    const file = target.files[0];
    setFormFields(prevState => ({...prevState, fileName: file.name}));
    setFormFields(prevState => ({...prevState, file}));
  }

  const closeDialog = () => {
    setIsSubmitting(false);
    props.onCloseDialog();
  }

  // Store receipt information to Storage and Firestore
  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      
      if (isEdit) {
        // Check whether image was changed - fileName will be not null
        if (formFields.fileName) {
          // Store image into Storage
          await replaceImage(formFields.file, formFields.imageBucketURL);
        }
        const newImageURL = await getDownloadURL(formFields.imageBucketURL);
        setFormFields(prevState => ({...prevState, imageURL: newImageURL}))
        await updateDish(formFields.id, formFields.available, formFields.category, formFields.description, formFields.dishName, formFields.imageBucketURL,
            formFields.imageURL, formFields.portion, formFields.portionNominal, formFields.price);
      } else {
        // Adding receipt
        // Store image into Storage
          const bucket = await uploadImage(formFields.file, formFields.category);
          const newImageURL = await getDownloadURL(bucket);
          // Store data into Firestore
          await addReceipt(formFields.category, formFields.dishName, formFields.description, formFields.price, formFields.portion, formFields.available, bucket, newImageURL, formFields.portionNominal);
        }
      props.onSuccess(isEdit ? DISHES_ENUM.edit : DISHES_ENUM.add);
    } catch (error) {
      props.onError(isEdit ? DISHES_ENUM.edit : DISHES_ENUM.add);
    }

    // Clear all form data
    closeDialog();
  };

  const theme = createTheme({
    palette: {
      primary: {
          // Purple and green play nicely together.
          main: yellow[800],
      },
      secondary: {
          // This is green.A700 as hex.
          main: '#6d1a1bcf',
      },
      textColor: {
          main: '#000'
      }
  },
  })

  return (
    <ThemeProvider theme={theme}>
    <Dialog classes={{paper: styles.dialog}}
      onClose={closeDialog}
      open={props.showDialog}
      component="form">
      <Typography variant="h4" className={styles.title}>
        {isEdit ? "РЕДАГУВАТИ" : "ДОДАТИ"} СТРАВУ
      </Typography>
      <DialogContent className={styles.fields} >
        <Stack direction="row" spacing={2} className={styles.receiptImage}>
          {(isEdit && !formFields.fileName) && <Avatar alt="receipt image" src={formFields.imageURL}/> }
          <Button variant="outlined" component="label" color="secondary" className={styles.imgPicker}>
            Обрати зображення
            <input type="file" hidden onInput={(event) => {setFileData(event.target)}} accept=".jpg, .jpeg, .png, .jfif"/>
          </Button>
          <Typography className={styles.pickedImg}>{formFields.fileName}</Typography>
        </Stack>
        <TextField size="small" id="filled-basic" label="Назва страви" variant="filled" value={!formFields.dishName && formFields.dishName.length !== 0 ? '' : formFields.dishName} onChange={(e) => updateFormField(e, 'dishName')} />
        <TextField size="small" id="filled-basic" label="Опис страви" multiline variant="filled" value={!formFields.description && formFields.description.length !== 0 ? '' : formFields.description} onChange={(e) => updateFormField(e, 'description')} />
        <Select size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formFields.category}
            onChange={(e) => updateFormField(e, 'category')}
            className={styles.select}
        >
          <MenuItem value={'Оберіть категорію'}>Оберіть категорію</MenuItem>
          {props.categories && props.categories.map((category, index) => (
            <MenuItem value={category} key={index}>{category}</MenuItem>
          ))}
        </Select>
        <TextField type="number" size="small" id="filled-basic" label="Ціна ₴" variant="filled" value={!formFields.price ? '' : Number(formFields.price)} onChange={(e) => updateFormField(e, 'price')} />
        <Stack direction="row" spacing={2} className={styles.portion}>
          <TextField size="small" id="filled-basic" label="Кількість" variant="filled" value={!formFields.portion && formFields.portion.length !== 0 ? '' : formFields.portion} onChange={(e) => updateFormField(e, 'portion')} />
          <Select size="small"
            labelId="portion-nominal-select-label"
            id="portion-nominal-select"
            value={formFields.portionNominal}
            onChange={(e) => updateFormField(e, 'portionNominal')}
            className={styles.select}
        >
          <MenuItem value={'--'}>--</MenuItem>
          <MenuItem value={'г.'}>г.</MenuItem>
          <MenuItem value={'мл.'}>мл.</MenuItem>
          <MenuItem value={'шт.'}>шт.</MenuItem>
        </Select>
        </Stack>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={formFields.available}
          name="radio-buttons-group"
          onChange={(e) => updateFormField(e, 'available')}
        >
          <FormControlLabel value='true' control={<Radio />} label="Доступно" />
          <FormControlLabel value='false' control={<Radio />} label="Недоступно" />
        </RadioGroup>
        
      </DialogContent>
      <DialogActions className={styles.buttons}>
        <Button  variant="contained" onClick={closeDialog}>Закрити</Button>
        {isSubmitting ? 
          <Button color="secondary" variant="contained" disabled={true}>
            Відправка...
          </Button> :
          <Button color="secondary" variant="contained" onClick={handleSubmit} disabled={isDisabled()}>
            Відправити
          </Button>}
      </DialogActions>
    </Dialog>
    </ThemeProvider>)
}