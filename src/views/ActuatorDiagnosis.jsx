import React, { useState, useEffect } from 'react';
import Ajax from '../utils/Ajax'
import endpoints from '../endpoints/index'
import checkToken from '../utils/sessionCheck'
import { logDict, eventLogger } from '../utils/eventLogger'
import Header from './Header';
import moment from 'moment';
import 'moment/locale/es';
import ActuatorReadings from './ActuatorReadings';
import { tsPropertySignature } from '@babel/types';

const ActuatorDiagnosis = (props) => {

    return (
        <div className="">
            <h1>Diagnostico</h1>
        </div>
    )
}

export default ActuatorDiagnosis;