<?php
$absolute_root = defined("ABSOLUTE_ROOT") ? ABSOLUTE_ROOT : $_SERVER['DOCUMENT_ROOT'];

require_once($absolute_root."/model/class.database.php");

class Contact {
	public function Contact(){}

	public function check_duplicates($first_name, $last_name, $email){

			$first_name	= strtolower($first_name);
			$last_name	= strtolower($last_name);
			$email		= strtolower($email);

			$select = "SELECT	count(1) c
						FROM	contacts
						WHERE	LOWER(first_name) = '$first_name'
							AND	LOWER(last_name) = '$last_name'
							AND LOWER(email) = '$email'";
			$return = Database::execute_query($select, 0);

			return $return['c'];
	}

	public function retrieve_contact_information($contact_id = '') {
		if ($contact_id == '')
			$contact_id = $_REQUEST['contact_id'];

		$select = "SELECT
			contacts.id,
			type_desc.DESCRIPTION type,
			vendorcode,
			first_name,
			last_name,
			first_name || ' ' || last_name name,
			telephone,
			fax,
			email,
			address1,
			address2,
			city,
			state,
			country,
			title_desc.DESCRIPTION title,
			zip,
			pager,
			cellphone ,
			region.code supported_region
		FROM contacts, lookuplistitem type_desc, lookuplistitem title_desc, region
                where contacts.id=$contact_id
                        and contacts.type = type_desc.LOOKUPLISTITEMID(+)
                        and contacts.TITLE = title_desc.LOOKUPLISTITEMID(+)
                        and contacts.supported_region = region.code(+) ";  //for now use outer join as there are records that are not the foreign key yet
                //D#40017,D#40804:: The above query was joining contacts.supported_region to region.id
                //But as part of D#39609 the code started saved the region code instead of the id in contacts because the region in CMP can have a different id
                //so code is the only way to join them; unless we change the integration/migration/instead-of-triggers on this contacts VIEW
		$contact_info = Database::execute_query($select, 0);
		return $contact_info;
	}

	public function retrieve_contact_information_raw($search_value) {
		$select = "
			select * from contacts
			where id='$search_value'";

		$result = Database::execute_query($select, 0);
		return $result;
	}

	public function retrieve_vendor_contacts($vendor_id){
		// E#9233
		// get only active vendor contacts
		$select = "SELECT
				id,
				type,
				vendorcode,
				first_name,
				last_name,
				first_name || ' ' || last_name name,
				telephone,
				fax,
				email,
				address1,
				address2,
				city,
				state,
				country,
				title,
				zip,
				pager,
				cellphone,
				supported_region
			FROM contacts, vendor_contacts
			WHERE vendor_id = '$vendor_id'
			AND contact_id = id
			AND active_flag=1";
		$result = Database::execute_query($select, 1);
		return $result;
	}

	public function retrieve_vendor_contacts_byclientid($vendor_id, $client_id){
	    // D42547 - both sections of this query were missing relationships - both sections were forming cartesians
		// E#9233
		// get only active vendor contacts
		$select = "SELECT
				id,
				type,
				vendorcode,
				first_name,
				last_name,
				first_name || ' ' || last_name name,
				telephone,
				fax,
				email,
				address1,
				address2,
				city,
				state,
				country,
				title,
				zip,
				pager,
				cellphone,
				supported_region
              FROM contacts cts, vendor_contacts vcs
              WHERE vcs.vendor_id = '$vendor_id'
                        AND vcs.client_id='$client_id'
                        AND vcs.active_flag=1
                        AND vcs.contact_id = cts.id
           union ( SELECT
				id,
				type,
				vendorcode,
				first_name,
				last_name,
				first_name || ' ' || last_name name,
				telephone,
				fax,
				email,
				address1,
				address2,
				city,
				state,
				country,
				title,
				zip,
				pager,
				cellphone,
				supported_region
			FROM contacts cts, vendor_contacts vcs,VENDOR_CLIENT VC
                 WHERE vcs.vendor_id = '$vendor_id' AND vcs.contact_id = cts.id
                        AND VC.client_id IN (select CONNECT_BY_ROOT ID from clients where id='$client_id' CONNECT BY PRIOR id = parent_id)
                        AND vcs.active_flag=1
                        AND vc.vendor_id = vcs.vendor_id
                        AND vc.client_id = vcs.client_id
                        and VC.CLIENT_CHILDREN_INHERIT = 'Y' )";
		$result = Database::execute_query($select, 1);
		return $result;
	}
}
//end class
?>
