import React, { useRef, useState, useEffect } from "react";
import './upload.scss'
import { Button } from "@material-ui/core";
import closeIcon from './close.png'
import { Controller } from "react-hook-form";

function Upload() {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validFiles, setValidFiles] = useState([]);
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

useEffect(() => {
  let filteredArr = selectedFiles.reduce((index, current) => {
    const dublicate = index.find(
      (item) => item.name === current.name && item.size === current.size && item.id === current.id,
    );

    if (!dublicate) {
      return index.concat([current]);
    } else {
      return index;
    }
  }, []);
  setValidFiles([...filteredArr]);
}, [selectedFiles]); 


// метод fileSelected, который отправляет файлы в handleFiles
  const filesSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
    }
  };


// метод handleFiles, который получает все перетаскиваемые файлы
  // проверяет правильность типа файлов
  // устанавливает состояние selectedFiles, если оно допустимо, или устанавливает переменную состояния errorMessage
  const handleFiles = (files) => {

    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
      } else {
        files[i]["invalid"] = true;
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
        setErrorMessage("File type not permitted");
        setUnsupportedFiles((prevArray) => [...prevArray, files[i]]);
      }
    }
  };



// метод, который содержит допустимые разрешенные типы файлов и проверяет, является ли каждый из файлов допустимым или нет
  const validateFile = (file) => {
    const validTypes = [
      "image/jpeg",
 
    ];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }

    return true;
  };

// метод, который получает имя файла и обрабатывает удаление файла из всех переменных состояния.
  const removeFile = (name) => {
    const index = validFiles.findIndex((e) => e.name === name);
    const index2 = selectedFiles.findIndex((e) => e.size === name);
    const index3 = unsupportedFiles.findIndex((e) => e.id === name);

    validFiles.splice(index, 1);
    selectedFiles.splice(index2, 1);
    setValidFiles([...validFiles]);
    setSelectedFiles([...selectedFiles]);
    if (index3 !== -1) {
      unsupportedFiles.splice(index3, 1);
      setUnsupportedFiles([...unsupportedFiles]);
    }
  };



// окончательный HTML, возвращаемый компонентом Upload
  return (
  <>
  <div className="UploadContainer" >
    <Button variant="contained" component='label' > загрузить файл
    <input type="file" 
    accept="image/*, .png, .pdf, .jpeg, .jpg, .epub, .svg, .HEIC "
    onChange={filesSelected}
    ref={fileInputRef}
    hidden multiple />
    </Button>

  </div>
  
  {validFiles.map((data) => (
    <div className="fnContainer" key={data.name}>
        <div className="fileName">{data.name}</div>
<img className="close" src={closeIcon} alt=""  onClick={() => removeFile(data.name)}/>
    </div>
  ))}
  </>


  );
}

export default Upload;




