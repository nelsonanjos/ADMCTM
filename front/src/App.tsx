import React, { useEffect, useRef, useState } from 'react';

import './App.css';

import { Form, Alert } from 'react-bootstrap';

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
  SpinnerStyle,
  IconDownload,
} from './App.style';

import { Colors } from './Colors';
import Logo from './assets/image/logo.png';
import api from './app.services';


function App() {
  const filevazio = 'Clique aqui para selecionar o arquivo';

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(<Alert variant='danger'></Alert>);

  const [nameFile, setNameFile] = useState(filevazio);
  const [file, setFile] = useState(null);
  const [clickCount, setClickCount] = useState(0);

  const fileToConvert = useRef(null);

  const [resp, setResp] = useState({ cod: 0, message: '' });


  function formIsValid() {
    if (nameFile === filevazio) {
      setClickCount(clickCount + 1);

      setAlert(
        <AlertStyle variant='danger'>
          <span>Selecione um arquivo para conversão.</span>
          <SpinnerStyle colorSpinner={'red'}/>
        </AlertStyle>
      );

      window.setTimeout(() => {
        setClickCount(0);
      }, 3000);

      return false;
    } else {
      return true;
    }
  };


  function convert(form: any) {
    form.preventDefault();
    setLoading(true);

    const formData = new FormData();

    if (formIsValid() && file) {
      formData.append('FILE', file);

      api
        .post('/enviar/mapa_conceitual', formData)
        .then((res) => setResp(res.data))
        .catch((err) => console.error('ERRO::::', err))
        .finally(() => setLoading(false));

    }
    else {
      setLoading(false);
    };



  };


  function download() {
    setLoading(true);

    api
      .get('/download/topics_map')
      .then((res) => setResp(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))

      window.open('http://localhost:3333/download/topics_map');
  }


  function cancel() {
    setNameFile(filevazio);
    setResp({ cod: 0, message: '' });
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

          {loading && <>
            <SpinnerStyle className={'spinner-grow spinner-border'} />
            <p style={{ color: 'gray' }}><b>Aguarde! Carregando...</b></p>
          </>}



          <Form onSubmit={(form) => { convert(form) }} onReset={() => cancel()}>


            <ColStyle marginTop={'3em'} textAlignLeft>

              <Form.Group controlId="formFile" className="mb-3">

                <RowBodyStyle>
                  {!loading &&
                    <LabelFileStyle>

                      <IconSelectFile />

                      {nameFile}

                      <InputFileStyle
                        ref={fileToConvert}
                        type={'file'}
                        accept={'.xml'}
                        onChange={(e: any) => {
                          setNameFile(e.target.value.replace('C:\\fakepath\\', ''));
                          setFile(e.target.files[0]);
                        }}
                      />

                    </LabelFileStyle>
                  }

                </RowBodyStyle>



              </Form.Group>

            </ColStyle>


            <RowBodyStyle>
              <IButton disabled={nameFile === filevazio || loading} type={'reset'} backgroundColor={Colors.secondary}>
                Limpar
                {!(nameFile === filevazio) && <IconCancel />}
              </IButton>


              <IButton disabled={loading} type={'submit'} backgroundColor={Colors.primary}>
                <IconConvert />
                Converter
              </IButton>


              { !loading && resp.cod === 200 &&
                <IButton disabled={loading} type={'button'} backgroundColor={Colors.info} onClick={download}>
                  <IconDownload />
                  Download
                </IButton>
              }
            </RowBodyStyle>

          </Form>

        </ColStyle>

      </ContainerStyle>

    </div >
  );
}

export default App;
