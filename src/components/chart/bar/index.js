import React, { memo, useMemo } from 'react';
import { letterFrequency } from '@visx/mock-data';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { GradientTealBlue } from '@visx/gradient';
import { useTooltip, useTooltipInPortal } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { AxisLeft, AxisBottom } from '@visx/axis';

const data = letterFrequency.slice(5);
const verticalMargin = 120;
const defaultMargin = { top: 40, right: 0, bottom: 0, left: 0 };
const purple3 = '#a44afe';

// accessors
const getLetter = d => d.letter;
const getLetterFrequency = d => Number(d.frequency) * 100;


// Finally we'll embed it all in an SVG
const BarGraph = ({ width = 500, height = 500, margin = defaultMargin }) => {
    const {
        tooltipData,
        tooltipLeft,
        tooltipTop,
        tooltipOpen,
        showTooltip,
        hideTooltip,
    } = useTooltip();

    // If you don't want to use a Portal, simply replace `TooltipInPortal` below with
    // `Tooltip` or `TooltipWithBounds` and remove `containerRef`
    const { containerRef, TooltipInPortal } = useTooltipInPortal({
        // use TooltipWithBounds
        detectBounds: true,
        // when tooltip containers are scrolled, this will correctly update the Tooltip position
        scroll: true,
    })

    // bounds
    const xMax = width;
    const yMax = height - verticalMargin;

    // scales, memoize for performance
    const xScale = useMemo(
        () =>
            scaleBand({
                range: [0, xMax],
                round: true,
                domain: data.map(getLetter),
                padding: 0.4,
            }),
        [xMax],
    );
    const yScale = useMemo(
        () =>
            scaleLinear({
                range: [yMax, 0],
                round: true,
                domain: [0, Math.max(...data.map(getLetterFrequency))],
            }),
        [yMax],
    );

    // console.log('asds');

    const handleMouseOver = (event, datum) => {
        const coords = localPoint(event.target.ownerSVGElement, event);
        showTooltip({
            tooltipLeft: coords.x,
            tooltipTop: coords.y,
            tooltipData: datum
        });
    };

    return (
        <div style={{ position: 'relative' }}>
            <svg ref={containerRef} width={width} height={height} fill="#fff">
                <GradientTealBlue id="teal" />
                <rect width={width} height={height} rx={14} />
                <Group top={verticalMargin / 2}>
                    {data.map(d => {
                        console.log(d);
                        const letter = getLetter(d);
                        const barWidth = xScale.bandwidth();
                        const barHeight = yMax - (yScale(getLetterFrequency(d)) ?? 0);
                        const barX = xScale(letter);
                        const barY = yMax - barHeight;
                        return (
                            <Bar
                                key={`bar-${letter}`}
                                x={barX}
                                y={barY}
                                width={barWidth}
                                height={barHeight}
                                fill="rgba(23, 233, 217, .5)"
                                onMouseMove={e => handleMouseOver(e, d)}
                                onMouseLeave={hideTooltip}
                            />
                        );
                    })}
                </Group>
                <AxisLeft
                    top={yMax + margin.top}
                    scale={scaleLinear({
                        domain: [0, Math.max(...data.map(getLetterFrequency))],
                        range: [yMax, 0],
                        round: true,
                    })}
                    stroke={purple3}
                    tickStroke={purple3}
                    tickLabelProps={() => ({
                        fill: purple3,
                        fontSize: 11,
                        textAnchor: 'middle',
                    })}
                />
                <AxisBottom
                    top={yMax + margin.top}
                    scale={scaleBand({
                        domain: data.map(getLetter),
                        range: [0, xMax],
                        padding: 0.4,
                        round: true,
                    })}
                    // tickFormat={formatDate}
                    stroke={purple3}
                    tickStroke={purple3}
                    tickLabelProps={() => ({
                        fill: purple3,
                        fontSize: 11,
                        textAnchor: 'middle',
                    })}
                />
            </svg>
            {tooltipOpen && (
                <TooltipInPortal
                    // set this to random so it correctly updates with parent bounds
                    key={Math.random()}
                    top={tooltipTop}
                    left={tooltipLeft}
                >
                    Letter: <strong>{tooltipData?.letter || ''}</strong><br />
                    Value: <strong>{tooltipData?.frequency ?? ''}</strong>
                </TooltipInPortal>
            )}
        </div>
    );
}

export default memo(BarGraph);