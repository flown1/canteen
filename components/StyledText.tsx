import React from 'react';
import { Text } from 'react-native';
import IMonoTextProps from "../@types/props/components/IMonoTextProps";

export class MonoText extends React.Component<IMonoTextProps, {}> {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'space-mono' }]} />;
  }
}
