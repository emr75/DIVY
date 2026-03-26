import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./GroupList.css";

const GroupList = () => {
  const navigate = useNavigate();

  // START OF TEMP DATA FOR VISUAL

  // Current listing details
  const asset = {
    id: 1,
    title: "Luxury Midtown Penthouse",
    address: "200 Park Avenue, New York, NY 10017",
    total_price: 1200000,
    created_at: "2025-10-10",
    property_image: "./images/apartment-placeholder.jpg",
    status: "Open",
  };

  // User's current groups (Right panel)
  const myGroups = [
    {
      id: 1,
      assetName: "Californian Home",
      groupName: "Easy Living",
      myShares: 3,
      status: "Active",
      totalValue: 750000,
      sharesAvailable: 20,
      pricePerShare: 15000,
      imageUrl: "./images/house-placeholder.jpg",
      postedAt: "2025-11-01",
      address: "45 Market Street, Rodeo Drive, LA",
    },
    {
      id: 2,
      assetName: "Uptown Condo",
      groupName: "Skyline Investors",
      members: 8,
      myShares: 5,
      status: "Active",
      totalValue: 600000,
      sharesAvailable: 10,
      pricePerShare: 12000,
      imageUrl: "./images/apartment-placeholder.jpg",
      postedAt: "2025-10-20",
      address: "900 5th Avenue, New York, NY",
    },
    {
      id: 3,
      assetName: "Beachfront Villa",
      groupName: "Coastal Collective",
      members: 20,
      myShares: 2,
      status: "Active",
      totalValue: 950000,
      sharesAvailable: 30,
      pricePerShare: 20000,
      imageUrl: "./images/beachfront-temp.jpg",
      postedAt: "2025-09-15",
      address: "12 Ocean Drive, Miami, FL",
    },
  ];
  // Available groups for current listing (Left panel)
  const availableGroups = [
    {
      id: 1,
      groupName: "Investors United",
      creator: "Michael R.",
      members: 15,
      totalShares: 45,
      targetShares: 50,
      pricePerShare: 15000,
    },
    {
      id: 2,
      groupName: "First-Time Buyers",
      creator: "Sandra P.",
      members: 9,
      totalShares: 20,
      targetShares: 40,
      pricePerShare: 10000,
    },
    {
      id: 3,
      groupName: "Vacation Homes",
      creator: "Chris L.",
      members: 22,
      totalShares: 60,
      targetShares: 80,
      pricePerShare: 18000,
    },
    {
      id: 4,
      groupName: "Rental Investors",
      creator: "Erica J.",
      members: 11,
      totalShares: 30,
      targetShares: 50,
      pricePerShare: 14000,
    },
  ];
  //   END OF TEMP DATA FOR VISUAL

  // Initialize Selected Asset
  // Selected asset details (from current asset)
  const [selectedAsset, setSelectedAsset] = useState({
    listing: {
      assetId: asset.id,
      title: asset.title,
      address: asset.address,
      totalValue: asset.total_price,
      postedAt: asset.created_at,
      imageUrl: asset.property_image,
      status: asset.status,
    },

    //Groups (to be changed with groups model)
    group: {
      id: null,
      members: 0,
      sharesAvailable: 0,
      pricePerShare: 0,
      totalSharesInGroup: 0,
      myShares: 0,
      isMyGroup: false,
    },
  });

  // Populate Asset Listing Information and current groups related to it
  const { listing, group } = selectedAsset;

  // GET Request
  // useEffect(() => {
  //   axios.get("/api/my-groups/")
  //     .then(res => setMyGroups(res.data))
  //     .catch(err => console.error(err));
  // }, []);

  // When joining a group, redirect to group form/page
  const handleJoinGroup = (groupId) => {
    navigate(`/groups/${groupId}/join`);
  };

  // Left Column Details - Users' current groups w group details
  // to be changed with group model
  const handleViewDetails = (groupData) => {
    setSelectedAsset({
      listing: {
        assetId: groupData.id,
        title: groupData.assetName,
        address: groupData.address,
        totalValue: groupData.totalValue,
        postedAt: groupData.postedAt,
        imageUrl: groupData.imageUrl,
        status: groupData.status,
      },
      group: {
        id: groupData.id,
        members: groupData.members,
        sharesAvailable: groupData.sharesAvailable,
        pricePerShare: groupData.pricePerShare,
        totalSharesInGroup: groupData.myShares,
        myShares: groupData.myShares,
        isMyGroup: true,
      },
    });
  };

  // Right Column Details - Available groups for the selected listing
  const handleAvailableDetails = (groupData) => {
    const remainingShares = groupData.targetShares - groupData.totalShares;

    setSelectedAsset({
      // From backend
      listing: {
        assetId: asset.id,
        title: asset.title,
        address: asset.address,
        totalValue: asset.total_price,
        postedAt: asset.created_at,
        imageUrl: asset.property_image,
        status: asset.status,
      },
      group: {
        // from TEMP
        id: groupData.id,
        members: groupData.members,
        sharesAvailable: remainingShares,
        pricePerShare: groupData.pricePerShare,
        totalSharesInGroup: groupData.totalShares,
        myShares: 0,
        isMyGroup: false,
      },
    });
  };

  // Create group for current listing - TBD
  const handleCreateGroupForAsset = () => {
    navigate(`/create-group?assetId=${listing.assetId}`);
  };

  // Fade In for Group Info
  const [detailsFade, setDetailsFade] = useState(false);

  // Fade animation trigger for center details
  useEffect(() => {
    if (!group) return;

    setDetailsFade(true);

    const timeout = setTimeout(() => {
      setDetailsFade(false);
    }, 450);

    return () => clearTimeout(timeout);
  }, [group.id, group.isMyGroup]);

  // Group Listings
  return (
    <div className="group-listings-container">
      {/* Left Column – My Groups */}
      <div className="left-column">
        <div className="column-header">
          <h2 className="column-title">My Groups</h2>
          <span className="count-badge">{myGroups.length}</span>
        </div>
        {/* List of Current Groups w Info */}
        <div className="groups-list">
          {myGroups.map((groupInfo) => (
            <div key={groupInfo.id} className="my-group-card">
              <div className="group-card-header">
                <h3 className="group-name">{groupInfo.groupName}</h3>
                <span className={`status-badge ${groupInfo.status.toLowerCase()}`}>
                  {groupInfo.status}
                </span>
              </div>
              <p className="asset-name">{groupInfo.assetName}</p>
              <div className="group-stats">
                <div className="stat">
                  <i className="bi bi-people"></i>
                  <span>{groupInfo.members} members</span>
                </div>
                <div className="stat">
                  <i className="bi bi-pie-chart"></i>
                  <span>{groupInfo.myShares} shares</span>
                </div>
              </div>
              {/* View Details for one of Users' Groups */}
              <button className="view-group-btn" onClick={() => handleViewDetails(groupInfo)}>
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Center Column – Selected Asset */}
      <div className="center-column">
        <div className="asset-display">
          <div className="asset-image-container">
            <img src={listing.imageUrl} alt={listing.title} className="asset-main-image" />
            <div className="asset-overlay">
              <h1 className="asset-title">{listing.title}</h1>
              <div className="asset-location">
                <i className="bi bi-geo-alt"></i>
                <span>{listing.address}</span>
              </div>
            </div>
          </div>
          {/* Use reusable Detail Card to populate asset details each time */}
          {/* Animation */}
          <div className={`asset-details ${detailsFade ? "fade-details" : ""}`}>
            {/* Total Asset Value */}
            <DetailCard
              icon="bi-currency-dollar"
              label="Total Value"
              value={`$${listing.totalValue.toLocaleString()}`}
            />
            {/* Price-per-Share for selected group */}
            <DetailCard
              icon="bi-tag"
              label="Price Per Share"
              value={group.pricePerShare ? `$${group.pricePerShare.toLocaleString()}` : "$0"}
            />
            {/* Available shares for selected group */}
            <DetailCard
              icon="bi-pie-chart"
              label="Shares Available"
              value={group.sharesAvailable}
            />
            {/* Listing Posted */}
            <DetailCard icon="bi-calendar-event" label="Posted" value={listing.postedAt} />
            {/* # of members for selected group */}
            <DetailCard icon="bi-people" label="Members" value={group.members} />
            {/* Shares */}
            <DetailCard
              icon="bi-graph-up"
              // Either show users shares (left panel) or total shares available (right panel)
              label={group.isMyGroup ? "Your Shares" : "Total Shares in Group"}
              value={group.isMyGroup ? group.myShares : group.totalSharesInGroup}
            />
          </div>
          {/* Join Group */}
          {!group.isMyGroup && group.id && (
            <button className="create-group-btn" onClick={() => handleJoinGroup(group.id)}>
              <i className="bi bi-plus-circle"></i>
              Join Group
            </button>
          )}
        </div>
      </div>

      {/* Right Column – Available Groups for Selected listing */}
      <div className="right-column">
        <div className="column-header">
          <h2 className="column-title">Available Groups</h2>
          <span className="count-badge">{availableGroups.length}</span>
        </div>
        {/* Group Info */}
        <div className="groups-list">
          {availableGroups.map((groupInfo) => (
            <div key={groupInfo.id} className="available-group-card">
              <div className="group-card-top">
                <h3 className="group-name">{groupInfo.groupName}</h3>
                <span className="creator-badge">by {groupInfo.creator}</span>
              </div>
              {/* Progress Bar */}
              <div className="group-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(groupInfo.totalShares / groupInfo.targetShares) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="progress-text">
                  {groupInfo.totalShares}/{groupInfo.targetShares} shares
                </span>
              </div>
              {/* # of Members */}
              <div className="group-info-grid">
                <div className="info-item">
                  <i className="bi bi-people"></i>
                  <span>{groupInfo.members} members</span>
                </div>
              </div>
              {/* Access Details */}
              <button className="join-group-btn" onClick={() => handleAvailableDetails(groupInfo)}>
                Group Details
              </button>
            </div>
          ))}

          {/* Create Group Button */}
          <div className="available-group-card create-group-card">
            <button className="join-group-btn" onClick={handleCreateGroupForAsset}>
              <i className="bi bi-plus-circle"></i>
              Create Group
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable detail card for Center Column
const DetailCard = ({ icon, label, value }) => (
  <div className="detail-card">
    <div className="detail-icon">
      <i className={`bi ${icon}`}></i>
    </div>
    <div className="detail-info">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
  </div>
);
// Detailcard PropTypes
DetailCard.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default GroupList;

// Reminder to add conditionals for when its not a real estate listing