import React, { useState, useEffect } from 'react';
import Ajax from '../utils/Ajax'
import endpoints from '../endpoints/index'
import checkToken from '../utils/sessionCheck'
import { logDict, eventLogger } from '../utils/eventLogger'
import InfiniteScroll from 'react-infinite-scroller';
import Header from './Header';
import moment from 'moment';
import 'moment/locale/es';

const ActuatorPage = (props) => {

	const [readings, setReadings] = useState({
		dates: [],
		values: [],
		currentPage: 1,
		hasMore: true
	})

	const [actuator, setActuator] = useState({
		name: '',
		model: '',
		modbus_address: '',
	})

	const [selectedValues, setSelectedValues] = useState([])

	const getActuatorData = () => {
		let req = new Ajax(endpoints.ACTUATOR + props.match.params.id, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json'
			},
			useBaseUrl: true,
			method: 'GET'
		})
		req.result()
			.then((res) => {
				setActuator(res.data)
			})
			.catch((error) => {
				console.log(error);
			})
	}

	const getReadings = () => {
		let req = new Ajax(endpoints.READINGS + props.match.params.id, {
			params: {
				'size': 5,
				'page': readings.currentPage
			},
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json'
			},
			useBaseUrl: true,
			method: 'GET'
		})
		req.result()
			.then((res) => {
				let newDates = res.results.map((elem) => elem.date)
				let newValues = res.results.map((elem) => elem.value_set)
				setReadings({
					dates: [...readings.dates, ...newDates],
					values: [...readings.values, ...newValues],
					currentPage: res.next !== null ? readings.currentPage + 1 : readings.currentPage,
					hasMore: res.next !== null ? true : false
				})
				setSelectedValues(readings.values)
			})
			.catch((error) => {
				console.log(error);
			})
	}

	const chooseDate = (index = null) => {
		if (!index) {
			setSelectedValues(readings.values)
			return
		}

		setSelectedValues(readings.values[index])
	}

	useEffect(() => {
		checkToken(() => {
			getReadings()
			getActuatorData()
		})
		eventLogger(logDict.READINGS, props.match.params.id)
	}, [])

	return (
		<div className="actuator-page">
			<Header
				{...props}
			/>
			<div className="dashboard__body readings-page">
				<div className="dashboard__left-panel">
					<div className="actuator-info">
            <div>Información del Actuador</div>
            <div>Nombre: {actuator.name}</div>
            <div>Modelo: {actuator.model}</div>
            <div>Direccion Modbus: {actuator.modbus_address}</div>
					</div>
					<div className="scroll-list">
						<label className="scroll-list__title">Seleccione una fecha</label>
						<div className="scroll-list__container scroll-panel">
							<InfiniteScroll
								pageStart={1}
								loadMore={() => { getReadings() }}
								hasMore={readings.hasMore}
								loader={<div className="loader" key={readings.currentPage}>Loading ...</div>}
								useWindow={false}
								threshold={5}
							>
								<div className="scroll-list__item" key={'reading-all'}
									onClick={() => chooseDate()}
								>
									<div className="scroll-list__content reading">
										<div className="reading__date">
											Todas las fechas
										</div>
									</div>
								</div>
								{readings.dates.map((reading, index) => {
									return (
										<div className="scroll-list__item" key={'reading-' + index}
											onClick={() => chooseDate(index)}
										>
											<div className="scroll-list__content reading">
												<div className="reading__date">
													{moment(reading).format('DD-MM-YYYY hh:mm a')}
												</div>
											</div>
										</div>
									)
								})}
							</InfiniteScroll>
						</div>
					</div>
				</div>
				<div className="dashboard__right-panel">
					<div className="scroll-list">
            
          </div>
				</div>
			</div>
		</div>
	);
}

export default ActuatorPage