/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import {useIsFocused} from '@react-navigation/native';
import * as React from 'react';
import {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Camera, Image} from 'react-native-pytorch-core';
import ImageClass from '../components/ImageClass';
import {ModelInfo, Models} from '../Models';
import ModelSelector from '../components/ModelSelector';
import useImageModelInference from '../useImageModelInference';

export default function CameraExample() {
  const isFocused = useIsFocused();
  const [activeModelInfo, setActiveModelInfo] = useState<ModelInfo>(Models[0]);
  const {imageClass, inferenceTime, processImage} = useImageModelInference(
    activeModelInfo,
  );

  const handleFrame = useCallback(
    async (image: Image) => {
      await processImage(image);
      image.release();
    },
    [processImage],
  );

  const handleCapture = useCallback(
    async (image: Image) => {
      await processImage(image);
      image.release();
    },
    [processImage],
  );

  return (
    <>
      {isFocused && (
        <Camera
          style={styles.camera}
          onFrame={handleFrame}
          onCapture={handleCapture}
          hideCaptureButton={true}
        />
      )}
      <ModelSelector
        style={styles.actions}
        modelInfos={Models}
        defaultModelInfo={activeModelInfo}
        onSelectModelInfo={setActiveModelInfo}
      />
      <ImageClass imageClass={imageClass} inferenceTime={inferenceTime} />
    </>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  actions: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
});
