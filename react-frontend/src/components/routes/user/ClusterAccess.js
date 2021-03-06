import React, { useState, useEffect } from 'react';


import { Link } from 'react-router-dom';
import DataService from '../../../restapi/data-service/DataService.js';

const ClusterAccess = () => {

	const initialFormData = Object.freeze({
		jsUserEmail: "",
		clusterUniqueId: "",
		accessedLabel: ""
	});

	const [clusters, setClusters] = useState([]);

	const [formData, updateFormData] = useState(initialFormData);
	const [result, setResult] = useState([]);
	const [validForm, setValidForm] = useState([]);
	const [errMsg, setErrMsg] = useState([]);
	useEffect(async () => {
		DataService.getAllClusters().then(
			(response) => {
				setClusters(response.data);
				console.log(response.data);
			}).catch((error) => {
				console.log(error);
			});

	}, []);

	const validateAccessForm = () => {

		var _u_email = JSON.parse(localStorage.getItem('_u_email'));
		if (formData.jsUserEmail === _u_email) {
			if (formData.accessedLabel && formData.accessedLabel.indexOf('=') > 1) {
				setValidForm('T');
				return true;
			} else {
				setValidForm('F');
				setErrMsg('Label field is of format KEY=VALUE. Please type again.');
				return false;
			}
		} else {
			setValidForm('F');
			setErrMsg('Data Invalid . Please retype your registered email.');
			return false;
		}
	}
	const handleChange = (e) => {

		updateFormData({
			...formData,
			[e.target.name]: e.target.value.trim()
		});
	};


	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(formData);
		if (validateAccessForm()) {
			DataService.raiseClusterAccess(formData).then(
				(response) => {
					console.log(response.data);
					setResult(response.data.message);
					if(result==='F'){
						setErrMsg('Request with bad or duplicate data couldnt be save into system');	
					}
				}).catch((error) => {
					setResult('F');
					setErrMsg('Request couldnt be raised due to data error . Please connect Admin!!!');
					console.log(error);
				});
		}
	};

const isEnabled = formData.accessedLabel.length > 0 && formData.jsUserEmail.length >0 && formData.clusterUniqueId >0;

	return (

		<div className="outer">
				<div className="inner">
				
								{(result === 'S') ?
									<div id="success-alert" class="alert alert-success" role="alert" >
										Resquest has been raised successfully
								</div> : ''}

								{(result === 'F') ? <div id="warnming-alert" class="alert alert-warning" role="alert" >
									{errMsg}
								</div> : ''}

								{validForm === 'F' ? <div id="pwd-alert" class="alert alert-danger" role="alert" >
									{errMsg}
								</div> : null}
								<form onSubmit={handleSubmit}>
									<p className="h4 text-center">Cluster Access Request</p>
									<div className="form-group required">
											<label className="control-label">Registered Email</label>
										<input class="w-100" placeholder="Type your email" type="text" validate name="jsUserEmail"
											onChange={handleChange} />
										<small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
									</div>
									<div class="form-group input-group-lg mb-3">
										<select class="form-select" aria-label="Select the cluster" onChange={handleChange} name="clusterUniqueId">
											<option selected>Select the cluster</option>
											{clusters.map((c, index) => <option value={c.uuid}>{c.name} of env {c.environment}</option>)}

										</select>
									</div>

									<div className="form-group required">
									<label className="control-label">Label (Key = Value)</label>
										<input class="w-100" placeholder="Key=value label please ..." type="text" onChange={handleChange} name="accessedLabel" />
									</div>
									<small id="labelHelp" class="form-text text-muted">provide the label selector based on that namespaces in that selected cluster will appear in your dashboard</small>
									<br />
									<br />
									<div class="button-group mb-3">
										<Link to="/home">
											<button style={{ textTransform: 'none' }}  className="btn btn-light float-left" rounded="true" >Cancel</button>
										</Link>
										<button type="button" style={{ textTransform: 'none' }}  onClick={handleSubmit} disabled={!isEnabled} className="btn btn-dark float-right" rounded="true"  >Submit</button>
									</div>
								</form>
							
			</div>
		</div>

	);
};

export default ClusterAccess;	