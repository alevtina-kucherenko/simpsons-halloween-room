import * as THREE from 'three'

import Experience from '../Experience.js'

import vertexShader from '../shaders/Ghost/vertex.glsl'
import fragmentShader from '../shaders/Ghost/fragment.glsl'

export default class Ghost {
    constructor(_options = {}) {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.time = this.experience.time
        this.ghostId = _options.id
        this.getTrajectoryObject = _options.getTrajectoryObject

        // Debug
        if (this.debug) {
            this.debugFolder = this.debug.addFolder(`ghost ${this.ghostId}`)
        }

        this.setModel()
    }

    setModel() {
        this.model = {}

        this.model.color = '#ffffff'

        // Material
        this.model.material = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            vertexShader,
            fragmentShader,
            uniforms:
                {
                    uTime: { value: 0 },
                    uTimeFrequency: { value: 0.0004 },
                    uUvFrequency: { value: new THREE.Vector2(4, 5) },
                    uColor: { value: new THREE.Color(this.model.color) }
                }
        })

        // Mesh
        this.model.mesh = new THREE.Mesh(new THREE.SphereGeometry(0.2, 256, 256), this.model.material)
        this.scene.add(this.model.mesh)

        // Debug
        if (this.debug) {
            this.debugFolder.addColor(this.model, 'color')
                .onChange(() => {
                    this.model.material.uniforms.uColor.value.set(this.model.color)
                })
        }
    }

    setMove() {
        const trajectoryObject = this.getTrajectoryObject(this.time.elapsed * 0.0008)
        this.model.mesh.position.x = trajectoryObject.x
        this.model.mesh.position.y = trajectoryObject.y
        this.model.mesh.position.z = trajectoryObject.z
    }

    update() {
        this.model.material.uniforms.uTime.value = this.time.elapsed

        this.setMove()
    }
}