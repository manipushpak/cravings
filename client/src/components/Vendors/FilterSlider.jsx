import React from 'react';

import styles from '../../styles/Vendors/FilterSlider.css';

import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { TooltipRail, Handle, Track, Tick } from "./components";
  
const defaultValues = [0, 10];
const domain = [0, 10];

const FilterSlider = props => {
    return (
        <div>
            <Slider
                mode={3}
                step={0.1}
                domain={domain}
                className={styles.sliderStyle}
                onChange={props.onChange}
                values={defaultValues}
            >
            <Rail>
                {({ getRailProps }) => <TooltipRail getRailProps={getRailProps} />}
            </Rail>
            <Handles>
                {({ handles, getHandleProps }) => (
                <div className="slider-handles">
                    {handles.map(handle => (
                    <Handle
                        key={handle.id}
                        handle={handle}
                        domain={domain}
                        getHandleProps={getHandleProps}
                    />
                    ))}
                </div>
                )}
            </Handles>
            <Tracks left={false} right={false}>
                {({ tracks, getTrackProps }) => (
                <div className="slider-tracks">
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