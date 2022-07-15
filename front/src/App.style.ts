import styled from 'styled-components';

import { Container, Row, Col, Form, Button, Image, Alert } from 'react-bootstrap';

import { SendPlus, Exclude, XSquareFill } from 'react-bootstrap-icons';
import { Colors } from './Colors';



interface IProps {
    marginTop?: string;
    border?: boolean;
    backgroundColor?: any;
    color?: any;
    src?: string;
    disabled?: boolean;
}

export const AlertStyle = styled(Alert)`
    color: #842029;
    background-color: #f8d7da;
    border-color: #f5c2c7;
    height: 3em;
    padding: 1em;
    text-align: center;
`;


export const LogoImage = styled(Image)`
    height: 150px;
    width: 120px;
    background-size: cover;
    margin-top: 10vh;
    margin-left: -45vh;
`;


export const ContainerStyle = styled(Container)`
  text-align: center;
  align-items: center;
`;


export const ColStyle = styled(Col)`
background-color: #F7F7F7;
    margin-top: ${(props: IProps) => props.marginTop || '-10vh'} ;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 3em;
    border: ${(props: IProps) => props.border && 'solid 1px #D3E3D2'};
    border-radius: 5px;
    width: 50em;
`;


export const RowTitleStyle = styled(Row)`
    color: ${(props: IProps) => props.color.dark};
    max-width: 85%;
    border-bottom: solid 1px ${(props: IProps) => props.border && Colors.primary.light};
    margin: 2em auto 0.5em auto;
`;


export const RowSubtitleStyle = styled(Row)`
    margin-bottom: 3px;
`;


export const RowBodyStyle = styled(Row)`
    margin: 6px auto;
`;


export const InputFileStyle = styled(Form.Control)`
    display: none;
`;


export const LabelFileStyle = styled(Form.Label)`
    border: solid 1px #000000;
    border-radius: 3px;
    padding: 10px;
    box-shadow: -3px 3px 5px 1px #564e4e;
    cursor: pointer;
`;


export const IButton = styled(Button)`
    background-color: ${(props: IProps) => !props.disabled ? props.backgroundColor?.dark : Colors.disabled};
    border: none;
    padding: 15px;
    margin: 15px;
    border-radius: 5px;
    min-width: 150px;
    color: #FFFFFF;
    font-size: 18px;
    font-weight: lighter;
    cursor: pointer;
    :hover{
        background-color: ${(props: IProps) => !props.disabled ? props.backgroundColor?.light : Colors.disabled};
    };
`;


export const IconSelectFile = styled(SendPlus)`
    margin: -4px 8px;
    font-size: 18px ;
`;


export const IconConvert = styled(Exclude)`
    margin: -4px 8px;
    font-size: 18px ;
    box-shadow: -4px 2px 20px 2px #006403;
`;


export const IconCancel = styled(XSquareFill)`
    margin: -4px 8px;
    font-size: 18px ;
    box-shadow: -4px 2px 20px 2px #2F3234;
`;





