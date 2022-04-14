import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
export default function Header({routingObj}) {
  const Navigate = useNavigate();

  const handleProfile = () => {
    Navigate('/profile')
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <p className="navbar-brand" href="#">ONLINE SCHOOL</p>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to={`${routingObj?.home}`}>Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={`${routingObj?.course}`}>Course</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={`${routingObj?.mcq}`}>MCQ</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <img onClick={handleProfile} src='https://previews.123rf.com/images/metelsky/metelsky1809/metelsky180900233/109815470-man-avatar-profile-male-face-icon-vector-illustration-.jpg' style={{width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer'}} alt="avatar"/>
        </div>
      </nav>
    </div>
  )
}
