import { ReactWidget } from '@jupyterlab/apputils';
import { fetchData, dateChanger } from './data_handler';
import React, { useState, useEffect } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import randomColor from 'randomcolor';

import '../style/metrics.css';
import {
  ReloadOutlined,
  ArrowDownOutlined,
  ExportOutlined,
  FileOutlined,
  PlusCircleOutlined
} from '@ant-design/icons';

/**
 * React component for a counter.
 *
 * @returns The React component
 */
const InformMetrics = (): JSX.Element => {
  const [experimentData, setExperimentData] = useState([]);
  useEffect((): void => {
    getData();
  }, []);

  const getData = (): void => {
    fetchData()
      .then((response: AxiosResponse) => {
        console.log(response.data);
        setExperimentData(response.data);
      })
      .catch((err: AxiosError) => console.log(err));
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="left-header">Runs</div>
          <div className="right-header">
            <ExportOutlined className="reload" />
          </div>
          <div className="right-header">
            <ReloadOutlined
              className="reload"
              onClick={(): void => getData()}
            />
          </div>
          <div className="right-header">
            Date
            <ArrowDownOutlined />
          </div>
        </div>
        <hr />
        <div className="content-area">
          {experimentData.length !== 0 ? (
            experimentData.reverse().map((data: any): JSX.Element => {
              const keys = Object.keys(data);
              return (
                <div key={data.run_id} className="log-card">
                  <div style={{ display: '-ms-flexbox', height: '5vh' }}>
                    <div
                      className="left-header"
                      style={{ fontWeight: 600, fontSize: '1rem' }}
                    >
                      {typeof data['start_time'] === 'number' &&
                        dateChanger(data.start_time && data.start_time)}
                    </div>
                    <div className="right-header">
                      <ExportOutlined className="reload" />
                    </div>
                    <div className="right-header">
                      <FileOutlined
                        className="reload"
                        onClick={(): void => getData()}
                      />
                    </div>
                  </div>
                  <div>
                    <ul>
                      {keys.map((key: string): JSX.Element => {
                        if (key.includes('metrics') && data[key] !== null) {
                          return (
                            <li>
                              <PlusCircleOutlined
                                style={{
                                  color: randomColor({
                                    luminosity: 'dark',
                                    format: 'rgb' // e.g. 'rgb(225,200,20)'
                                  }),
                                  paddingRight: '10px'
                                }}
                              />
                              <span
                                style={{ fontWeight: 300, color: 'GrayText' }}
                              >
                                {key.split('.')[1]}
                              </span>
                              :{'        '} {data[key]}
                            </li>
                          );
                        } else return <></>;
                      })}
                    </ul>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No Logs Available</p>
          )}
        </div>
      </div>
    </>
  );
};

/**
 * A Counter Lumino Widget that wraps a CounterComponent.
 */
export class Metrics extends ReactWidget {
  /**
   * Constructs a new CounterWidget.
   */
  constructor() {
    super();
    this.addClass('jp-ReactWidget');
  }

  render(): JSX.Element {
    return <InformMetrics />;
  }
}
