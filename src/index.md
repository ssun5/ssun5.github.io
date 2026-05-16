---
layout: "base.njk"
title: Home Page
eleventyImport:
  collections: ["post"]
nav: False
---
<h1>
hi. <br>
i'm <br>
shan-wei.
</h1>
I'm an engineer working on the Internal Tools Team at Juul Labs, where I build infrastructure that power product research, testing, and formulation. My background is in electrical engineering, robotics, and control theory. Here you can check out some of the things I'm working on. Please enjoy. 

This website is under active development.

<div class="w-[95vw] relative ml-[-47.5vw] mr-[-47.5vw] left-[50%] right-[50%]">
  <div class="bento">
    <div class="item row-span-2">
      <img class="h-full" src="/assets/img/zs_boards.jpeg" alt="makers_mark">
    </div>
    <div class="item">
      <img class="h-full" src="/assets/img/Bent_R_V_Q.jpg" alt="modeling thin film resistor">
    </div>
    <a class="item item-link row-span-2 col-span-2" href="/posts/cg_walker">
      <span class="item-link__title">Bipedal Compass-Gait Walker</span>
      <img class="item-link__media h-full" src="/assets/img/cg_walker/x1_orbit_fine.png" alt="Bipedal Compass-Gait Walker">
    </a>
    <a class="item-link grid grid-rows-subgrid grid-cols-subgrid min-h-0 col-span-2 row-span-2 md:row-span-1 md:col-span-4 lg:col-span-2 lg:row-span-2" href="/posts/soft_tracker">
      <span class="item-link__title">Surface Referencing Soft Bodies</span>
      <div class="item">
        <img class="item-link__media h-full" src="/assets/img/soft_tracker/device_back.jpg" alt="device_view1">
      </div>
      <div class="item">
        <img class="item-link__media h-full" src="/assets/img/soft_tracker/device_top.jpg" alt="device_view2">
      </div>
      <div class="item">
        <img class="item-link__media h-full object-[25%_25%]" src="/assets/img/soft_tracker/device_and_markers.jpg" alt="device_view3">
      </div>
      <div class="item">
        <img class="item-link__media h-full" src="/assets/img/soft_tracker/measuring_foam_form.jpg" alt="device_view4">
      </div>
    </a>
    <div class="item">
      <video class="h-full scale-150" autoplay loop muted>
        <source src="/assets/img/cg_walker/CG_walk_animation.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
    <a class="item item-link row-span-2">
      <span class="item-link__title">Constant Current Stepper Drive (coming soon)</span>
      <img class="item-link__media h-full scale-115 origin-[0%_90%]" src="/assets/img/cnc/cnc3.jpeg" alt="cnc">
    </a>
    <a class="item item-link row-span-2 col-span-2" href="/posts/opamp">
      <span class="item-link__title">Operational Amplifier Design</span>
      <img class="item-link__media h-full" src="/assets/img/opamp/opamp_note1.jpeg" alt="opamp notes">
    </a>
    <a class="item item-link">
      <span class="item-link__title">MuJoCo UR10e (coming soon)</span>
      <img class="item-link__media h-full scale-120 origin-[10%_40%]" src="/assets/img/mujoco/ur10e.png" alt="ur10e">
    </a>
    <div class="item col-span-2 bg-neutral-900 flex items-center justify-center">
      <img class="object-contain" src="/assets/img/tetris/tetris_pieces.svg" alt="tetris pieces">
    </div>
    <a class="item item-link flex items-center justify-center bg-neutral-900" href="/posts/spread_spectrum">
      <span class="item-link__title">Spread Spectrum Clock Design</span>
      <img class="item-link__media object-contain scale-80" src="/assets/img/spread_spectrum/delay_block.svg" alt="SSCLK">
    </a>
    <a class="item item-link" href="/posts/tetris">
      <span class="item-link__title">Autonomous Tetris Agent</span>
      <video class="item-link__media h-full w-full" autoplay loop muted>
        <source src="/assets/img/tetris/tetris.mp4" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </a>
    <a class="item item-link" href="/posts/sys_id">
      <span class="item-link__title">System Identification</span>
      <img class="item-link__media h-full" src="/assets/img/PChat_rlocus_zoom.jpg" alt="sys_id">
    </a>
  </div>
</div>

## Control System Stuffs

{% set items = [
  { image: '/assets/img/sys_id/second_order.svg', title: 'Techniques in System Identification', caption: 'Notes on practical techniques of characterizing systems of first-order, second-order, and beyond.', url: '/posts/sys_id'},
  { image: '/assets/img/tetris/tetris_cover.jpg', title: 'Autonomous Tetris Agent', caption: 'In this project, I use reinforcement learning techniques to train a computer agent to play the game of Tetris.', url: '/posts/tetris'},
  { image: '/assets/img/cg_walker/x1_orbit_fine.png', title: 'Bipedal Compass-Gait Walker', caption: 'Deriving EOMs with Newton-Euler and Lagrangian mechanics. Observing limit-cycles, bifurcation, and chaos.', url: '/posts/cg_walker'},
  { image: '/assets/img/visual_tactile/DIGIT_0.png', title: 'Closing the Loop: Visual-Tactile Feedback for Robotic Grippers', caption: 'Why high-fidelity touch is the next bottleneck for dexterous robots, and what insect compound eyes have to do with it', url: '/posts/visual_tactile'}
] %}

{% from "cards.njk" import render_cards %}
{{ render_cards(items) | safe }}
