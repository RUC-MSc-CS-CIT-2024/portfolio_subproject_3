import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { formatDate } from '@/utils';
import { MediaTypeBadge, DefaultImage } from '@/components';
import { fetchMediaById } from '@/services';

export default function CreditsList({ items = [] }) {
  const [expandedGroups, setExpandedGroups] = useState({});
  const [mediaData, setMediaData] = useState({});

  useEffect(() => {
    const fetchMediaData = async () => {
      const seriesIds = [
        ...new Set(items.map((item) => item.media.seriesId).filter(Boolean)),
      ];
      const mediaPromises = seriesIds.map((id) => fetchMediaById(id));
      const mediaResults = await Promise.all(mediaPromises);
      const mediaMap = mediaResults.reduce((acc, media) => {
        acc[media.id] = media;
        return acc;
      }, {});
      setMediaData(mediaMap);
    };

    fetchMediaData();
  }, [items]);

  const groupedItems = items.reduce((acc, item, index) => {
    const key = item.media.seriesId || item.media.id;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push({ ...item, originalIndex: index });
    return acc;
  }, {});

  const toggleGroup = (key) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getCharacters = (group) =>
    group
      .map((item) => item.character)
      .filter(Boolean)
      .join(', ');

  const isSameMedia = (group) => {
    const firstItem = group[0].media;
    return group.every(
      (item) =>
        item.media.id === firstItem.id &&
        item.media.title === firstItem.title &&
        item.media.type === firstItem.type &&
        item.media.releaseDate === firstItem.releaseDate,
    );
  };

  const renderSingleRow = (item, index) => (
    <tr key={index} className="single-row">
      <td className="d-flex align-items-center">
        {item.media.posterUri ? (
          <img
            className="mx-2 responsive-img"
            src={item.media.posterUri}
            height={68}
          />
        ) : (
          <div className="default-image-container mx-2">
            <DefaultImage />
          </div>
        )}
        <div className="single-title">
          <p>{item.media.title}</p>
        </div>
      </td>
      <td className="align-middle">
        <MediaTypeBadge type={item.media.type} />
      </td>
      <td className="align-middle text-capitalize">
        {item.character && <p>Character: {item.character}</p>}
      </td>
      <td className="align-middle">{formatDate(item.media.releaseDate)}</td>
    </tr>
  );

  const renderGroupRow = (key, group, index) => {
    const seriesMedia = mediaData[group[0].media.seriesId] || group[0].media;
    const characters = getCharacters(group);
    return isSameMedia(group) ? (
      <tr key={index} className="single-row">
        <td className="d-flex align-items-center">
          {seriesMedia.posterUri ? (
            <img
              className="mx-2 responsive-img"
              src={seriesMedia.posterUri}
              height={68}
            />
          ) : (
            <div className="default-image-container mx-2">
              <DefaultImage />
            </div>
          )}
          <div className="single-title">
            <p>{seriesMedia.title}</p>
          </div>
        </td>
        <td className="align-middle">
          <MediaTypeBadge type={seriesMedia.type} />
        </td>
        <td className="align-middle text-capitalize">
          {characters && <p>Character: {characters}</p>}
        </td>
        <td className="align-middle">{formatDate(seriesMedia.releaseDate)}</td>
      </tr>
    ) : (
      <>
        <tr
          key={index}
          className="cursor-pointer"
          onClick={() => toggleGroup(key)}
        >
          <td className="d-flex align-items-center">
            {seriesMedia.posterUri ? (
              <img
                className="mx-2 responsive-img"
                src={seriesMedia.posterUri}
                height={68}
              />
            ) : (
              <div className="default-image-container mx-2">
                <DefaultImage />
              </div>
            )}
            <div className="flex-grow-1">
              <p>
                {seriesMedia.title}{' '}
                {group.length > 1 ? `(${group.length} titles)` : '(1 title)'}
              </p>
            </div>
            <div className="dropdown-arrow">
              <i
                className={`bi ${expandedGroups[key] ? 'bi-chevron-up' : 'bi-chevron-down'}`}
              ></i>
            </div>
          </td>
          <td className="align-middle">
            <MediaTypeBadge type={seriesMedia.type} />
          </td>
          <td className="align-middle text-capitalize"></td>
          <td className="align-middle"></td>
        </tr>
        {expandedGroups[key] &&
          group.map((item, idx) => (
            <tr key={`${key}-${idx}`} className="nested-row">
              <td className="d-flex align-items-center">
                {item.media.posterUri ? (
                  <img
                    className="mx-2 responsive-img"
                    src={item.media.posterUri}
                    height={68}
                  />
                ) : (
                  <div className="default-image-container mx-2">
                    <DefaultImage />
                  </div>
                )}
                <div className="nested-title">
                  <p>{item.media.title}</p>
                </div>
              </td>
              <td className="align-middle">
                <MediaTypeBadge type={item.media.type} />
              </td>
              <td className="align-middle text-capitalize">
                {item.character && <p>Character: {item.character}</p>}
              </td>
              <td className="align-middle">
                {formatDate(item.media.releaseDate)}
              </td>
            </tr>
          ))}
      </>
    );
  };

  const rows = Object.entries(groupedItems)
    .sort((a, b) => a[1][0].originalIndex - b[1][0].originalIndex)
    .map(([key, group], index) =>
      group.length === 1
        ? renderSingleRow(group[0], index)
        : renderGroupRow(key, group, index),
    );

  return (
    <div className="table-responsive">
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Role</th>
            <th>Release Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, index) => (
              <React.Fragment key={`row-${index}`}>{row}</React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={4} height={100} className="text-center align-middle">
                No known works available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
