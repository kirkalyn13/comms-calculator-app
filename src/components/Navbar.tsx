import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="container-nav">
            <nav>
                <Link to="/">
                    Home
                </Link>
                <Link to="/information_capacity">
                    Information Capacity
                </Link>
                <Link to="/noise_factor">
                    Noise Factor
                </Link>
                <Link to="/antenna_gain">
                    Antenna Gain
                </Link>
                <Link to="/parabolic_antenna_gain">
                    Parabolic Antenna Gain
                </Link>
                <Link to="/radio_range">
                    Radio Range
                </Link>
                <Link to="/free_space_path_loss">
                    Free Space Path Loss
                </Link>
                <Link to="/effective_isotropic_radiated_power">
                    Effective Radiated Isotropic Power
                </Link>
                <Link to="/isotropic_receive_level">
                    Isotropic Radiated Level
                </Link>
                <Link to="/link_budget">
                    Link Budget
                </Link>
            </nav>
        </div>
    )
}

export default Navbar
