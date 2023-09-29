/**
 * This code is the SiteList component.
 * It renders a list of sites that the current user has access to.
 * If the user is an admin, they will see all sites.
 * If the user is a site owner, they will only see sites that they own.
 */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SiteHelper from "../common/Site";
import { Link } from "react-router-dom";
import PageAuth from "../common/PageAuth";
import SearchBar from "./SearchBar";
import ToolBar from "./ToolBar";

const searchFields = ["title", "domain"];

const toolList = [{
    type: "button",
    text: "Create New Site",
    icon: "fa-plus",
    class: "add-new-button",
    callBackOrLink: "/sites/new"
}];

const SiteList = () => {
    const [currentSites, setCurrentSites] = useState([]);
    const [showSiteAdminTools, setShowSiteAdminTools] = useState(false);
    const [showGlobalAdminTools, setShowGlobalAdminTools] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);

    const sites = useSelector(state => state.site.sites);
    const users = useSelector(state => state.user.users);
    const site_permissions = useSelector(state => state.site_permissions.site_permissions);

    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser) {
            setShowSiteAdminTools(PageAuth.adminAuth(currentUser));
            setShowGlobalAdminTools(PageAuth.globalAdminAuth(currentUser));
        }

        setCurrentSites(sites);

    }, [dispatch, sites]);

    const findByName = (sites) => {
        setCurrentSites(sites);
    };
    
    return (
        <div>
            {(showSiteAdminTools || showGlobalAdminTools) ? (
                <div>
                    <div className="site-list-container">
                        <h4 className="site-list-header">{`${showGlobalAdminTools ? "Site List" : "Your Sites"}`}</h4>
                        <SearchBar callBackFunction={findByName} fields={searchFields} data={sites} />
                        <ToolBar toolList={toolList} />
                        <ul className="site-list">
                            {currentSites &&
                                currentSites.map((site, index) => (
                                    <li
                                        className="card"
                                        key={index}
                                    >
                                        <img class="profile-img-card" alt="site_image"></img>
                                        <h4 class="profile-header-card">{`Site: ${site.title}`}</h4>
                                        <div class="profile-description-card">{`Domain: ${site.domain}`}</div>
                                        {
                                            (showGlobalAdminTools && SiteHelper.isSiteOwner(currentUser.id, site._id, site_permissions)) &&
                                            <div className="profile-owner-card">
                                                <span>Owner: </span>{`${SiteHelper.getSiteOwner(site._id, users, site_permissions)}`}
                                            </div>
                                        }
                                        <button class="profile-link-card">
                                            <Link
                                                className="link"
                                                to={`/site/${site._id}`}
                                            >
                                                View
                                            </Link>
                                        </button>
                                    </li>

                                )
                                )
                            }
                        </ul>
                    </div>
                </div>
            ) : (<div>You do not have access to this site.</div>)
            }
        </div>
    );
};

export default SiteList;
