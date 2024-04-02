# <img src="cq-overlaysdashboard.png" alt="cq-overlays/dashboard" height="36" />

> A broadcast graphics dashboard for controlling Splatoon tournament overlays

![License][license-shield]
![Stars][stars-shield]

A NodeCG dashboard bundle for controlling Splatoon tournament overlays. It's decoupled from any overlays to allow anyone to connect their own overlays seamlessly to the dashboard.

This bundle was originally designed for [Off the Dial's overlays](https://github.com/offthedial/overlays), however it has since been refined and remodeled to support splatoon tournament streams of any size and complexity.

- Seamlessly control teams, scores, maps, colors, commentators and more using a single, unified control panel
- Automatically set map winners when scores are changed
- Preload team data, round data, and commentator block data into the dashboard

## usage

### installing nodecg with this bundle

#### for programmers

1. Prerequisites
   1. Make sure you have [Node (with NPM)](https://nodejs.org) installed
   2. Make sure you have the NodeCG CLI installed: `npm i -g nodecg`
2. Create a new directory and `cd` into it
3. Setup a new NodeCG Instance: `nodecg setup`
4. CD into the bundles directory: `cd bundles/`
5. Find the version you're looking for on the [releases](https://github.com/cq-overlays/dashboard/releases) page, and download `cq-dashboard.zip`, the built bundle, and unzip.
   - The zip file only contains the built files (and a `package.json`), so you do not need to use `npm i` or `npm run build`.
6. You can now install other bundles by dragging them into the `bundles/` subdirectory.
7. Run NodeCG: `nodecg start`

#### for non-programmers

1. Find the version you're looking for on the [releases](https://github.com/cq-overlays/dashboard/releases) page, and download `cq-nodecg.zip`, a NodeCG instance with this bundle pre-installed, and unzip.
2. You can now install other bundles by dragging them into the `bundles/` subdirectory.
3. Run NodeCG by double-clicking `run.bat`, This is only for windows.

The dashboard should now be accessible! If you run into any issues or have any questions, feel free to contact me!

### using the dashboard

The dashboard is mainly self-explanatory and can be easily learned with just a bit playing with it. For those who want a quick run-down, here are some general tips and tricks:

- Each panel is draggable and positionable, although NodeCG doesn't give you much flexibility with that
- Buttons with colored backgrounds usually update the overlays immediately. Buttons with no color or background usually need their changes to be applied using an "Update" button with a colored background
- On the `Teams` panel, there is a button in the middle of the 2 scores that will reset them
- Changing the score will automatically set the map winners. The map winners buttons don't actually do anything-

The upload file for `Loaded Data` is a JSON file, which you can find the schema for [here](https://github.com/cq-overlays/dashboard/blob/main/schemas/loadedData.json). If you don't know how to create a JSON file, there's a lot of online tools that let you create one without any programming experience, do a quick google search for "online json editor"! Maybe later I'll think of a way to create these files within the dashboard itself.

If you run into any issues or have any questions, feel free to contact me!

### making your own overlays with this bundle
The way you connect to the stored dashboard data is with just replicants.

> ```js
> const currentTeams = nodecg.Replicant("currentTeams", "cq-dashboard");
>
> currentTeams.on("change", (newValue, oldValue) => {
>   // Write some logic here
> }
> ```

The documented list of all the available replicants are available in the [schemas](/schemas) folder. Each file is the [JSON Schema](https://json-schema.org) for the corresponding replicant. Don't worry if you can't understand it though, there's also a `"default"` key in the schema which shows you an example of what the replicant value might look like.

For more information on how to build your own bundles, see the [NodeCG documentation](https://www.nodecg.dev/docs/creating-bundles). If you run into any issues or have any questions, feel free to contact me!

## local setup

1. Follow the steps in [Installing NodeCG](#installing-nodecg-with-this-bundle), **stop after step 3**
2. Install this bundle for development: `nodecg install cq-overlays/dashboard --dev`
3. CD into the bundle directory: `cd bundles/dashboard`
4. Start the development server: `npm run dev`
5. Create a new window to start NodeCG from, and run NodeCG: `nodecg start`
6. If you are building for production: `npm run build`

---

*empathy included • [**@cysabi**](https://github.com/cysabi) • [cysabi.github.io](https://cysabi.github.io)*

<!-- markdown links & imgs -->

[stars-shield]: https://img.shields.io/github/stars/cq-overlays/dashboard.svg?style=social
[license-shield]: https://img.shields.io/github/license/cq-overlays/dashboard.svg?style=flat
