import * as THREE from 'three'

import Experience from '../Experience.js'

export default class SimpsonsRoom {
    constructor() {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.scene = this.experience.scene

        // Resource
        this.texture = this.resources.items.bakedTexture
        this.resource = this.resources.items.simpsonsModel

        this.setModel()
    }

    setModel() {
        this.model = this.resource.scene
        this.model.position.y = -1

        this.scene.add(this.model)

        this.texture.flipY = false
        this.texture.encoding = THREE.sRGBEncoding

        // Material
        const frontMaterial = new THREE.MeshBasicMaterial({ map: this.texture, side: THREE.FrontSide })
        const backMaterial = new THREE.MeshBasicMaterial({ color: 0xffc71d, side: THREE.BackSide })

        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                if (
                    child.name === 'insidePumpkin1' ||
                    child.name === 'insidePumpkin2' ||
                    child.name === 'insidePumpkin3' ||
                    child.name === 'insidePumpkin4' ||
                    child.name === 'insidePumpkin5' ||
                    child.name === 'insidePumpkin6' ||
                    child.name === 'insidePumpkin7' ||
                    child.name === 'insidePoleLight'
                ) {
                    child.geometry.addGroup(0, Infinity, 0)
                    child.geometry.addGroup(0, Infinity, 1)

                    child.material = [frontMaterial, backMaterial]
                } else {
                    child.material = frontMaterial
                    child.material.side = THREE.DoubleSide
                }
            }
        })
    }

    update() {}
}