import React, { useEffect, useRef, useState } from 'react';

import './App.css';

import { Form, Alert, Spinner } from 'react-bootstrap';

import {
  ContainerStyle,
  RowTitleStyle,
  RowBodyStyle,
  RowSubtitleStyle,
  ColStyle,
  InputFileStyle,
  LabelFileStyle,
  IconSelectFile,
  IButton,
  IconConvert,
  IconCancel,
  LogoImage,
  AlertStyle,
} from './App.style';

import { Colors } from './Colors';
import Logo from './assets/image/logo.png';
import api from './app.services';


function App() {
  const filevazio = 'Clique aqui para selecionar o arquivo';

  const [alert, setAlert] = useState(<Alert variant='danger'></Alert>);

  const [nameFile, setNameFile] = useState(filevazio);
  const [file, setFile] = useState(null);
  const [clickCount, setClickCount] = useState(0);

  const fileToConvert = useRef(null);


  function formIsValid() {
    if (nameFile === filevazio) {
      setClickCount(clickCount + 1);

      setAlert(
        <AlertStyle variant='danger'>
          <span>Selecione um arquivo para conversão.</span>
          <Spinner style={{ backgroundColor: '#FF0000' }} animation="grow" variant="danger" />
        </AlertStyle>
      );

      window.setTimeout(() => {
        setClickCount(0);
      }, 1500);

      return false;
    } else {
      return true;
    }
  };


  function convert(form: any) {
    form.preventDefault();

    const formData = new FormData();

    if(formIsValid() && file){
      formData.append('FILE', file);
      
      
      api
        .post('/enviar/mapa_conceitual', formData)
        .then((res) => console.log(res))
        .catch((err) => console.error('ERRO::::', err))
      ;

    };

    

  };


  function cancel() {
    setNameFile(filevazio);
  };


  useEffect(() => {
    if (nameFile === '') {
      setNameFile(filevazio);
    }
  }, [nameFile]);



  return (
    <div className="App">
      {clickCount > 0 && alert}

      <ContainerStyle>

        <LogoImage src={Logo} fluid />

        <ColStyle border>

          <RowTitleStyle border color={Colors.primary}>
            <h1>ADMCTM</h1>
          </RowTitleStyle>

          <RowSubtitleStyle>
            <h4>Converta seu Mapa Conceitual em Mapa de Tópicos</h4>
          </RowSubtitleStyle>



          <Form onSubmit={(form) => { convert(form) }} onReset={() => cancel()}>

            <ColStyle marginTop={'3em'} textAlignLeft>


              <Form.Group controlId="formFile" className="mb-3">

                <RowBodyStyle>

                  <LabelFileStyle>
                    <IconSelectFile />
                    {nameFile}
                    <InputFileStyle
                      ref={fileToConvert}
                      type='file'
                      onChange={(e: any) => {
                        setNameFile(e.target.value.replace('C:\\fakepath\\', ''));
                        setFile(e.target.files[0]);
                      }}
                    />
                  </LabelFileStyle>

                </RowBodyStyle>



              </Form.Group>

            </ColStyle>


            <RowBodyStyle>
              <IButton disabled={nameFile === filevazio} type={'reset'} backgroundColor={Colors.secondary}>
                Cancelar
                {!(nameFile === filevazio) && <IconCancel />}
              </IButton>


              <IButton type={'submit'} backgroundColor={Colors.primary}>
                <IconConvert />
                Converter
              </IButton>
            </RowBodyStyle>

          </Form>

        </ColStyle>

      </ContainerStyle>

    </div >
  );
}

export default App;
