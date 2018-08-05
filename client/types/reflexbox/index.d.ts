import * as React from 'react';

interface IReflexBoxProps {
  /**
   * sets width, where numbers 0-1 are percentage values, larger numbers are pixel values, and strings are raw CSS values with units.
   */
  w?: number | string

  /**
   * Sets display: flex
   */
  flex?: boolean

  /**
   * Sets flex-wrap: wrap
   */
  wrap?: boolean

  /**
   * sets flex-direction: column
   */
  column?: boolean

  /**
   * sets flex: 1 1 auto
   */
  auto?: boolean

  /**
   * sets order
   */
  order?: number

  /**
   * sets align-items
   */
  align?: string

  /**
   * sets justify-content
   */
  justify?: string

  /**
   *  margin based on a scale from 0–4.
   */
  m?: number|string

  /**
   *  x-axis margin based on a scale from 0–4.
   */
  mx?: number|string

  /**
   *  y-axis margin based on a scale from 0–4.
   */
  my?: number|string

  /**
   *  margin-top based on a scale from 0–4.
   */
  mt?: number|string

  /**
   *  margin-bottom based on a scale from 0–4.
   */
  mb?: number|string

  /**
   *  margin-left based on a scale from 0–4.
   */
  ml?: number|string

  /**
   *  margin-right based on a scale from 0–4.
   */
  mr?: number|string

  /**
   *  padding based on a scale from 0–4.
   */
  p?: number|string

  /**
   *  x-axis padding based on a scale from 0–4.
   */
  px?: number|string

  /**
   *  y-axis padding based on a scale from 0–4.
   */
  py?: number|string

  /**
   *  padding-top based on a scale from 0–4.
   */
  pt?: number|string

  /**
   *  padding-bottom based on a scale from 0–4.
   */
  pb?: number|string

  /**
   *  padding-left based on a scale from 0–4.
   */
  pl?: number|string

  /**
   *  padding-right based on a scale from 0–4.
   */
  pr?: number|string
}

export class Flex extends React.Component<IReflexBoxProps, {}> {}
export class Box extends React.Component<IReflexBoxProps, {}> {}
