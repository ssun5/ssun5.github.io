---
title: Contact-Aware Pick and Place with a 6-DoF Arm
date: '2026-06-01'
---
<h1 class="mt-0 pt-0 about_title">{{ title }}</h1>
<div id="pick_and_place">
{%- from 'video.njk' import render_video %}
{{ render_video("/assets/img/mujoco/pick_and_place1.mp4") }}
</div>

# Introduction
I am developing a real-world automated pick-and-place application utilizing a 6-DoF robotic arm, targeting the UR10e and UR5e platforms from *Universal Robots*. The immediate application is laboratory automation — sample sorting, reagent handling, and repetitive bench-top tasks that are high-value targets for robotic automation but require fine manipulation and reliable contact handling. The long-term goal is a generalized manipulation platform transferable across research and industrial settings.

## Approach
The core architecture is a three-layer hierarchy: a collision-free motion planner (RRT-Connect) handles gross arm movement, a phase-aware sequential task framework decomposes the pick-and-place into discrete stages each with its own completion conditions and sub-policy, and residual reinforcement learning is reserved for contact-rich phases (grasp and placement) where classical planning breaks down. This design deliberately minimizes the scope of what RL needs to learn, reducing sample complexity and making sim-to-real transfer more tractable.
## Technical Stack
MuJoCo, `dm_control`, RRT-Connect path planning, multi-seed inverse kinematics, sequential task decomposition, PID control with feedforward gravity compensation, reinforcement learning.

<div id="obstacle_avoidance">
{%- from 'video.njk' import render_video %}
{{ render_video("/assets/img/mujoco/obstacle_avoidance8.mp4") }}
</div>
<p class="fig_caption">Obstacle avoidance with RRT-Connect</p>
<br>

## Status
This project is in active development. Completed components:
<ol>
<li><b>Multi-seed inverse kinematics:</b> LM solver with multiple seed configurations, singularity detection, and quaternion double-cover handling</li>
<li><b>Sequential task framework:</b> phase-based task decomposition with per-phase completion conditions, clean policy/task boundary, and episode-safe resets</li>
<li><b>Sub-policy architecture:</b> per-phase sub-policies with timestep-independent interpolated position control and feedforward gravity compensation</li>
<li><b>Physics-accurate simulation:</b> custom UR10e + Robotiq 2F-85 3D-models built with PyMJCF, including TCP site instrumentation and dynamic visualization markers</li>
<li><b>Visualization utilities:</b> mocap-based runtime markers, configurable camera rendering, and video export pipeline</li>
</ol>

### To Do:
<ol>
<li><b>Proximity-aware penalty:</b> reward shaping to discourage near-collisions during approach and transfer phases</li>
<li><b>Obstacle avoidance with real-time update:</b> dynamic replanning as scene geometry changes</li>
<li><b>Feedback linearization:</b> full gravity and Coriolis compensation for improved low-speed trajectory tracking — see TMT-method in <a href="/posts/cg_walker"> Compass-Gait Walker post</a> on formulation </li>
<li><b>Residual RL for contact phases:</b> learned corrective policy over grasp descent and placement, trained on top of the classical planner</li>
<li><b>Sim-to-real transfer:</b> domain randomization, actuator modelling, and latency compensation for deployment on physical hardware</li>
</ol>
