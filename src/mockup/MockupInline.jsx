import React, { Suspense, useRef, useEffect } from "react"
import { Box } from 'gestalt'
import { Canvas } from "@react-three/fiber"
import { OrbitControls } from '@react-three/drei'
import { useGLTF } from "@react-three/drei/core/useGLTF"
import { convertImageToTextureCallback } from "../utils/helpers"
import * as THREE from "three"

function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
      ref.current = value;
    }, [value]); 

    return ref.current;
}

function Model(props) {
    const { customization = {}, color = "", material_maps = [] } = props
    const { material_roughness, glb = '' } = customization
    
    const prevColor = usePrevious(color)
    const prevMaterialMaps = usePrevious(material_maps)

    const object = useGLTF(glb)
    const { scene } = object

    useEffect(() => { if(prevColor != color || JSON.stringify(prevMaterialMaps) != JSON.stringify(material_maps)) init() }, [color, material_maps])

    const init = () => {
        convertImageToTextureCallback(color, function(colorMaterial) {
            scene.traverse((obj) => {
                if(obj instanceof THREE.Mesh) {
                    obj.material.map = colorMaterial
                    obj.material.roughness = material_roughness
                    
                    material_maps.forEach((material) => {
                        if(material.material_url && material.mesh_name.toLowerCase() == obj.name.toLowerCase()) {
                            convertImageToTextureCallback(material.material_url, function(materialMap) {
                                obj.material.map = materialMap
                            })
                        }
                    })
                }
            })
        })
    }

    return (<primitive object={scene} />)
}

const MockupInline = (props) => {
    const { customization = {} } = props
    const { lights = [], min_distance, max_distance = 600 } = customization
    
    return (
        <Box height='100%' display="flex" wrap>
            <Box column={12} smColumn={8} flex='grow' position="relative">
                <Suspense>
                    <Canvas>
                        {
                            lights.map((light, index) => (
                                <pointLight
                                    key={index}
                                    color={light.color} 
                                    intensity={light.intensity} 
                                    position={light.position} 
                                    power={light.power} 
                                />
                            ))
                        }
                        
                        <group>
                            <Model 
                                {...props}
                            />
                        </group>
                        
                        <OrbitControls 
                            minPolarAngle={Math.PI / 3} 
                            maxPolarAngle={Math.PI / 1.5} 
                            autoRotate
                            minDistance={min_distance}
                            maxDistance={max_distance}
                        />
                    </Canvas>
                </Suspense>
            </Box>
        </Box>
    )
}

export default MockupInline