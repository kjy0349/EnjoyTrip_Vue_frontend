<script setup>
import {
  FwbNavbar,
  FwbNavbarCollapse,
  FwbNavbarLink,
  FwbNavbarLogo,
} from 'flowbite-vue'
</script>

<template>
	<div>
		<fwb-navbar>
			<template #logo>
				<fwb-navbar-logo alt="Flowbite logo" image-url="/images/logo.svg" link="#">
					EnjoyTrip
				</fwb-navbar-logo>
			</template>
			<template #default="{isShowMenu}">
				<fwb-navbar-collapse :is-show-menu="isShowMenu">
				<fwb-navbar-link is-active link="#">
					Home
				</fwb-navbar-link>
				<fwb-navbar-link>
					<RouterLink to="/board">게시판</RouterLink>
				</fwb-navbar-link>
				<fwb-navbar-link link="#">
					Pricing
				</fwb-navbar-link>
				<fwb-navbar-link link="#">
					Contact
				</fwb-navbar-link>
				</fwb-navbar-collapse>
			</template>
		</fwb-navbar>
	</div>
</template>

<style scoped>

</style>