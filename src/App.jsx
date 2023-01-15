import { Button } from '@material-ui/core';
import React,  { useState } from 'react';
import './App.scss';
import Upload from './upload/Upload';
import {CircularProgress} from '@material-ui/core';
import { sendMessage } from './redux/actions';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { Selecters } from './select/Select';
import FileUpload from './upload/Upload';

 export const AppealTypeSelecter = [
  { label: 'Обращение 1', value: '' },
  { label: 'Обращение 2', value: '' },
  { label: 'Обращение 3', value: '' },
]

function App() {
const [loading, setLoading] = useState(false); 
const [reason, setReason] = useState("");

const [files, setFiles] = useState([])

const removeFile = (filename) => {
  setFiles(files.filter(file => file.name !== filename))
}

const validationSchema = yup.object().shape({
  textarea: yup.string().required(('Ошибка! Заполните поле обращения')),
  select: yup.string().lowercase().required(('')).email(('Ошибка! Выберите тип обращения')),
});

const {control, register, handleSubmit, reset, formState,
  formState: { errors }} = useForm({
  resolver: yupResolver(validationSchema),
  mode: 'onChange',
});


React.useEffect(() => {
  if (formState.isSubmitSuccessful) {
    reset();
  }
}, [formState, reset]);

const onSubmit = (data) => {
  alert(JSON.stringify(data));
};

const handleChangeReason = (e) => {
  setReason(e.target.value)
}

  return (
 <div className="FormFeedback" onSubmit={handleSubmit(onSubmit)}>


<h1>I never thought I'd die alone
I laughed the loudest, who'd have known?
I trace the cord back to the wall
No wonder it was never plugged in at all
I took my time, I hurried up</h1>

<h2>The choice was mine, I didn't think enough
I'm too depressed to go on
You'll be sorry when I'm gone</h2>

<h3>I never conquered, rarely came
Sixteen just held such better days
Days when I still felt alive</h3>


  <div className={`loadingContainer ${loading ? '' : 'hide'}`}>
    <CircularProgress/>
  </div>
<p className="line"></p>
<div className="title">
<div className="value"> 

<Selecters
  id={"select"}
  isRequired={true} 
  options={AppealTypeSelecter}
  register={register}
  />

</div>
</div>
<div className="reasonContainer">
<div className="title">укажите ваше обращение</div>
<textarea onChange={handleChangeReason} className="reason" value={reason}></textarea>
</div>

<div className="files">
{/* <Upload name = 'files'  control={control}  /> */}
<FileUpload files={files} setFiles={setFiles}
        removeFile={removeFile} />

</div>
<div className="buttonContained">
  <Button variant='contained' color='secondary' onClick={sendMessage}>отправить</Button>
</div>
</div>


  );
}

export default App;
