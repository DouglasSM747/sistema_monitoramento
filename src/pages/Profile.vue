<template>
  <div class="row">
    <div class="col-md-50" style="margin-left: auto margin-right: auto">
      <edit-profile-form>
      </edit-profile-form>
    </div>
  </div>
</template>
<script>
  import EditProfileForm from './Profile/EditProfileForm';
  import UserCard from './Profile/UserCard'
  import axios from "axios";
  export default {
    components: {
      EditProfileForm,
    }
  }
</script>
<style>
</style>
