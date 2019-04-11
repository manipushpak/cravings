import React from 'react';

import styles from '../../styles/Vendors/Vendors.css';

import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { SliderRail, Handle, Track, Tick } from "./components";
  
const defaultValue = [15];
const domain = [0, 50];

const FilterSlider = props => {
    return (
        <div>
            <Slider
                mode={2}
                step={0.1}
                domain={domain}
                className={styles.sliderStyle}
                onChange={props.onChange}
                values={defaultValue}
            >
            <Rail>
                {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
            </Rail>
            <Handles>
                {({ activeHandleID, handles, getHandleProps }) => (
                <div className="slider-handles">
                    {handles.map(handle => (
                    <Handle
                        key={handle.id}
                        handle={handle}
                        domain={domain}
                        activeHandleID={activeHandleID}
                        getHandleProps={getHandleProps}
                    />
                    ))}
                </div>
                )}
            </Handles>
            <Tracks right={false}>
                {({ tracks, getTrackProps }) => (
                    <div>
                        {tracks.map(({ id, source, target }) => (
                        <Track
                            key={id}
                            source={source}
                            target={target}
                            getTrackProps={getTrackProps}
                        />
                        ))}
                    </div>
                )}
            </Tracks>
            <Ticks count={1}>
                {({ ticks }) => (
                <div className="slider-ticks">
                    {ticks.map(tick => (
                    <Tick key={tick.id} tick={tick} count={ticks.length} />
                    ))}
                </div>
                )}
            </Ticks>
            </Slider>
        </div>
    );
}

export default FilterSlider;